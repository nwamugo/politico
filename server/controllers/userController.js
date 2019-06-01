import { validationResult } from 'express-validator/check';
import moment from 'moment';

import db from '../models/db';
import Secure from './secureController';

const User = {
  async signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Some details are missing'
        }
      );
    }
    if (!Secure.isValidEmail(req.body.email)) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Please enter a valid email address'
        }
      );
    }
    const hashPassword = Secure.hashPassword(req.body.password);


    const createQuery = `INSERT INTO
      users(first_name, last_name, other_name, phone_number, email, password, passport_url, is_admin, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.other_name || '',
      req.body.phone_number,
      req.body.email,
      hashPassword,
      req.body.passport_url || '',
      false,
      moment(new Date())
    ];


    try {
      const { rows } = await db.query(createQuery, values);
      const token = Secure.generateToken(rows[0].id);
      delete rows[0].password;
      return res.status(201).json(
        {
          status: 201,
          data: [
            {
              token,
              user: rows[0],
            }
          ]
        }
      );
    } catch (error) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Could not authenticate database password'
        }
      );
    }
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array().map(a => a.msg);
      return res.status(422).json({
        status: 422,
        errors: error
      });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(400).json(
        {
          status: 400,
          message: 'Some values are missing'
        }
      );
    }
    if (!Secure.isValidEmail(req.body.email)) {
      return res.status(400).json(
        {
          status: 400,
          message: 'Please enter a valid email address'
        }
      );
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json(
          {
            status: 400,
            message: 'The details are incorrect'
          }
        );
      }
      if (!Secure.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json(
          {
            status: 400,
            error: 'Incorrect password'
          }
        );
      }
      const token = Secure.generateToken(rows[0].id);
      return res.status(200).json(
        {
          status: 200,
          data: [
            {
              token,
              user: rows[0],
            }
          ]
        }
      );
    } catch (error) {
      return res.status(400).json(
        {
          status: 400,
          error: 'Cannot reach database!'
        }
      );
    }
  },
};

export default User;
