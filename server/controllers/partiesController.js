import moment from 'moment';
import { validationResult } from 'express-validator/check';

import db from '../models/db';
import Helper from './helper';

export default {
  async postNewParty(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    const createQuery = `INSERT INTO
    parties(name, hq_address, logo_url, created_date)
    VALUES($1, $2, $3, $4)
    RETURNING *`;
    const values = [
      req.body.name,
      req.body.hq_address,
      req.body.logo_url,
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
            error: 'There cannot be two parties of the same name',
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

  async patchParty(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    if (Helper.partyIdFail(req)) {
      return res.status(422).json(
        {
          status: 422,
          error: 'Invalid party id',
        }
      );
    }
    const findOneParty = 'SELECT * FROM parties WHERE id=$1';
    const editOneParty = `UPDATE parties
    SET name=$1, hq_address=$2, logo_url=$3
    WHERE id=$4 returning *`;

    if (req.user.is_admin) {
      try {
        const { rows } = await db.query(findOneParty, [req.params.party_id]);
        if (!rows[0]) {
          return res.status(404).json(
            {
              status: 404,
              error: 'Party not found'
            }
          );
        }
        const values = [
          req.body.name || rows[0].name,
          req.body.hq_address || rows[0].hq_address,
          req.body.logo_url || rows[0].logo_url,
          req.params.party_id
        ];
        const response = await db.query(editOneParty, values);
        return res.status(200).json(
          {
            status: 200,
            data: [response.rows[0]],
          }
        );
      } catch (err) {
        return res.status(501).json(
          {
            status: 501,
            error: 'Could not successfully edit party',
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


  async getAllParties(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM parties');
      const allParties = rows;
      const total = rowCount;
      return res.status(200).json(
        {
          status: 200,
          data: [{
            allParties,
            total,
          }]
        }
      );
    } catch (err) {
      res.status(501).json(
        {
          status: 501,
          error: 'Could not get all parties',
        }
      );
    }
  },


  async getOneParty(req, res) {
    if (Helper.partyIdFail(req)) {
      return res.status(422).json(
        {
          status: 422,
          error: 'Invalid party id',
        }
      );
    }
    const text = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.party_id]);
      if (!rows[0]) {
        return res.status(404).json(
          {
            status: 404,
            error: 'Party was not found'
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
          error: 'The request failed!',
        }
      );
    }
  },


  async deleteAParty(req, res) {
    if (Helper.partyIdFail(req)) {
      return res.status(422).json(
        {
          status: 422,
          error: 'Invalid party id',
        }
      );
    }
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';

    if (req.user.is_admin) {
      try {
        const { rows } = await db.query(deleteQuery, [req.params.party_id]);
        if (!rows[0]) {
          return res.status(404).json(
            {
              status: 404,
              error: 'Party not found'
            }
          );
        }
        return res.status(410).json(
          {
            status: 410,
            message: 'Party successfully deleted!'
          }
        );
      } catch (error) {
        return res.status(501).json(
          {
            status: 501,
            error: 'Oops! Could not delete',
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
  }
};
