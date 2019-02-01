import moment from 'moment';
import uuid from 'uuid';
import db from '../models/db';

export default {
  async postNewOffice(req, res) {
    const createQuery = `INSERT INTO
    offices(id, type, name, created_date)
    VALUES($1, $2, $3, $4)
    RETURNING *`;
    const values = [
      uuid.v4(),
      req.body.type,
      req.body.name,
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
            message: 'There cannot be multiple offices of the same name'
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
  },

  async getAllOffices(req, res) {
    try {
      const { rows, rowCount } = await db.query('SELECT * FROM offices');
      const allOffices = rows;
      const total = rowCount;
      return res.status(200).json(
        {
          status: 200,
          data: {
            allOffices,
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

  async getOneOffice(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } = await db.query(text, req.params.id);
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
};
