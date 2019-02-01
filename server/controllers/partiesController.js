import moment from 'moment';
import uuid from 'uuid';
import db from '../models/db';

export default {
  async postNewParty(req, res) {
    const createQuery = `INSERT INTO
    parties(id, name, hq_address, logo_url, created_date)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [
      uuid.v4(),
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
        if (error.routine === '_bt_check_unique') {
          return res.status(400).json(
            {
              status: 400,
              message: 'There cannot be two parties of the same name'
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
    } else {
      return res.status(400).json(
        {
          status: 400,
          message: 'You don\'t have admin privileges',
        }
      );
    }
  },

  async patchParty(req, res) {
    const findOneParty = 'SELECT * FROM parties WHERE id=$1';
    const editOneParty = `UPDATE parties
    SET name=$1, hq_address=$2, logo_url=$3
    WHERE id=$4 returning *`;

    if (req.user.is_admin) {
      try {
        const { rows } = await db.query(findOneParty, req.params.id);
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
          req.params.id
        ];
        const response = await db.query(editOneParty, values);
        return res.status(200).json(
          {
            status: 200,
            data: response.rows[0],
          }
        );
      } catch (err) {
        return res.status(400).json(
          {
            status: 400,
            error: err.toString(),
          }
        );
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


  async getAllParties(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM parties');
      const allParties = rows;
      const total = rowCount;
      return res.status(200).json(
        {
          status: 200,
          data: {
            allParties,
            total,
          }
        }
      );
    } catch (err) {
      res.status(400).json(
        {
          status: 400,
          error: err.toString(),
        }
      );
    }
  },


  async getOneParty(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } = await db.query(text, req.params.id);
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
          data: rows[0]
        }
      );
    } catch (error) {
      return res.status(400).json(
        {
          status: 400,
          error: error.toString(),
        }
      );
    }
  },


  async deleteAParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';

    if (req.user.is_admin) {
      try {
        const { rows } = await db.query(deleteQuery, req.params.id);
        if (!rows[0]) {
          return res.status(404).json(
            {
              status: 404,
              error: 'party not found'
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
        return res.status(400).json(
          {
            status: 400,
            error: error.toString(),
          }
        );
      }
    } else {
      return res.status(400).json(
        {
          status: 400,
          message: 'You don\'t have admin privileges',
        }
      );
    }
  }
};
