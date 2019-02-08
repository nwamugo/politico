import moment from 'moment';
import { validationResult } from 'express-validator/check';

import db from '../models/db';
import Helper from './helper';

export default {
  async postNewOffice(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    const createQuery = `INSERT INTO
    offices(type, name, created_date)
    VALUES($1, $2, $3)
    RETURNING *`;
    const values = [
      req.body.type,
      req.body.name,
      moment(new Date())
    ];

    if (req.user.is_admin) {
      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).json(
          {
            status: 201,
            data: [rows[0]],
          }
        );
      } catch (error) {
        return res.status(409).json(
          {
            status: 409,
            error: 'There cannot be multiple offices of the same name',
          }
        );
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

  async getAllOffices(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM offices');
      const allOffices = rows;
      const total = rowCount;
      return res.status(200).json(
        {
          status: 200,
          data: [{
            allOffices,
            total,
          }]
        }
      );
    } catch (err) {
      res.status(500).json(
        {
          status: 500,
          error: 'Oops! failed to process your request',
        }
      );
    }
  },

  async getOneOffice(req, res) {
    if (Helper.officeIdFail(req)) {
      return res.status(422).json(
        {
          status: 422,
          error: 'Invalid office id',
        }
      );
    }
    const text = 'SELECT * FROM offices WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.office_id]);
      if (!rows[0]) {
        return res.status(404).json(
          {
            status: 404,
            error: 'Office was not found'
          }
        );
      }
      return res.status(200).json(
        {
          status: 200,
          data: [rows[0]]
        }
      );
    } catch (error) {
      return res.status(500).json(
        {
          status: 500,
          error: 'Something went wrong while processing your request',
        }
      );
    }
  },
};
