import jwt from 'jsonwebtoken';
import db from '../models/db';

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Token is not provided'
        }
      );
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (rows[0]) {
        req.user = rows[0];
        next();
      } else {
        return res.status(400).json(
          {
            status: 400,
            error: 'Token is expired or invalid',
          }
        );
      }
    } catch (error) {
      return res.status(400).json(
        {
          status: 400,
          error: error.toString(),
        }
      );
    }
  }
};

export default Auth;
