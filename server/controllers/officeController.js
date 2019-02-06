import moment from 'moment';
import { validationResult } from 'express-validator/check';

import db from '../models/db';

export default {
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
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
    const createQuery = `SELECT COUNT(votes.candidate)
    AS result, candidates.office, candidates.id
    FROM votes JOIN candidates
    ON candidates.id = votes.candidate
    WHERE votes.candidate = candidates.id
    AND candidates.office = $1
    GROUP BY candidates.id, candidates.candidate, candidates.office`;

    try {
      const { rows } = await db.query(createQuery, [req.params.office_id]);
      console.log(rows[0]);
      if (!rows[0]) {
        return res.status(404).json(
          {
            status: 404,
            error: 'Office with that id not found'
          }
        );
      }
      return res.status(201).json(
        {
          status: 201,
          data: [rows[0]],
        }
      );
    } catch (error) {
      return res.status(500).json(
        {
          status: 500,
          error: 'Something went wrong with the request',
        }
      );
    }
  }
};
