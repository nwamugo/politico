import moment from 'moment';
import uuid from 'uuid';
import db from '../models/db';

export default {
  async register(req, res) {
    if (req.user.is_admin) {
      const createQuery = `INSERT INTO
      candidates(id, office, party, candidate, created_date)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`;
      const values = [
        uuid.v4(),
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
        return res.status(500).json({
          status: 500,
          error: error.toString(),
        });
      }
    } else {
      return res.status(400).json(
        {
          status: 400,
          message: 'You don\'t have admin privileges',
        }
      );
    }
  },

  async collateAndFetch(req, res) {
    const createQuery = 'SELECT * FROM pg_collation WHERE id=$1';
    try {
      const { rows } = await db.query(createQuery, req.params.office_id);
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
