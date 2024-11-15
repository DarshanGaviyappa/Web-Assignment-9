// middlewares/validation.js

const { check, validationResult } = require('express-validator');

exports.validateUserCreation = [
  check('fullName').notEmpty().withMessage('Full name is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'
    ),
];

exports.validateUserUpdate = [
  check('fullName').optional().notEmpty().withMessage('Full name is required'),
  check('password')
    .optional()
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol'
    ),
];
