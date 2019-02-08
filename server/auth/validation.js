import { body } from 'express-validator/check';

const validation = {
  checkSignup: [
    body('first_name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('First name cannot be empty.'),
    body('last_name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Last name is required.'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Password should be at least 4 characters'),
    body('phone_number')
      .isLength({ min: 4 })
      .withMessage('Phone number must be at least 4 characters long')
  ],
  checkLogin: [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Password should be at least 4 characters')
  ],
  checkPatch: [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required'),
    body('hq_address')
      .trim(),
    body('logo_url')
      .trim()
  ],
  checkNewOffice: [
    body('type')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Type is required'),
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required')
  ],
  checkNewParty: [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Name is required')
  ],
  checkNewCandidate: [
    body('office')
      .matches(/^\d+$/)
      .withMessage('Office field should be a number'),
    body('party')
      .matches(/^\d+$/)
      .withMessage('Party field should be a number'),
    body('office')
      .matches(/^\d+$/)
      .withMessage('Candidate field should be a number')
  ],
  checkVotes: [
    body('office')
      .matches(/^\d+$/)
      .withMessage('Office field should be a number'),
    body('candidate')
      .matches(/^\d+$/)
      .withMessage('Candidate field should be a number')
  ]
};

export default validation;
