import moment from 'moment';
import db from '../models/db';

export default {
  async register(req, res) {
    if (req.user.is_admin) {
      const createQuery = `INSERT INTO
      candidates(office, party, candidate, created_date)
      VALUES($1, $2, $3, $4)
      RETURNING *`;
      const values = [
        req.body.office,
        req.body.party,
        req.params.user_id,
        moment(new Date())
      ];
      try {
        const { rows } = await db.query(createQuery, values);
        console.log(rows[0]);
        return res.status(201).json({
          status: 201,
          data: [rows[0]],
        });
      } catch (error) {
        return res.status(409).json({
          status: 409,
          error: 'You cannot register twice for the same office',
        });
      }
    } else {
      return res.status(401).json(
        {
          status: 401,
          message: 'You don\'t have admin privileges',
        }
      );
    }
  },

  async collateAndFetch(req, res) {
    const createQuery = 'SELECT * FROM pg_collation';
    try {
      const { rows } = await db.query(createQuery);
      console.log(rows[0]);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString(),
      });
    }
  }
};
