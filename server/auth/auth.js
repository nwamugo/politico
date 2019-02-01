import jwt from 'jsonwebtoken';

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
      req.user = { id: decoded.userId };
      next();
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
