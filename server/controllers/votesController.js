import moment from 'moment';
import uuid from 'uuid';
import db from '../models/db';

export default {
  async vote(req, res) {
    const createQuery = `INSERT INTO
    votes(id, created_on, created_by, office, candidate)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [
      uuid.v4(),
      moment(new Date()),
      req.body.created_by,
      req.body.office,
      req.body.candidate
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
            message: 'Voter can only vote once for a particular office'
          }
        );
      }
      return res.status(400).json(
        {
          status: 400,
          error: error.toString(),
        }
      );
    }
  }
};
