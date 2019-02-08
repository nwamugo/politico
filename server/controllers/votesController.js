import { validationResult } from 'express-validator/check';
import moment from 'moment';

import db from '../models/db';

export default {
  async vote(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    const createQuery = `INSERT INTO
    votes(created_on, created_by, office, candidate)
    VALUES($1, $2, $3, $4)
    RETURNING *`;
    const values = [
      moment(new Date()),
      req.user.id,
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
      if (error.toString() === 'error: insert or update on table "votes" violates foreign key constraint "votes_candidate_fkey"') {
        res.status(404).json({
          status: 404,
          error: 'Please check that the candidate exists',
        });
      } else if (error.toString() === 'error: insert or update on table "votes" violates foreign key constraint "votes_office_fkey"') {
        return res.status(404).json({
          status: 404,
          error: 'Please check that the office exists',
        });
      } else if (error.toString() === 'error: duplicate key value violates unique constraint "votes_pkey"') {
        return res.status(409).json({
          status: 409,
          error: 'Duplicate voting is not allowed',
        });
      } else {
        return res.status(404).json(
          {
            status: 404,
            error: error.toString(),
          }
        );
      }
    }
  }
};
