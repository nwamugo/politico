import moment from 'moment';
import uuid from 'uuid';
import db from '../models/db';

export default {
  async register(req, res) {
    const createQuery = `INSERT INTO
    candidates(id, office, party, user, created_date)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [
      uuid.v4(),
      req.body.office,
      req.body.party,
      req.params.id,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json(
        {
          status: 201,
          data: [rows[0]],
        }
      );
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json(
          {
            status: 400,
            message: 'One candidate to one office'
          }
        );
      }
      return res.status(400).json(
        {
          status: 201,
          error: error.toString(),
        }
      );
    }
  }
}
