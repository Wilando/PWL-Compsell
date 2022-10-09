const { body, validationResult } = require('express-validator');
const {
  User,
} = require('../../models');

const tambahUserRules = () => [
  body('nama', 'Nama tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('email', 'Email tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('email', 'Format email tidak valid').isEmail().normalizeEmail().trim(),
  body('email').custom((value) => User.findOne({ where: { email: value } }).then((admin) => { // eslint-disable-line consistent-return
    if (admin) {
      return Promise.reject('Email Telah digunakan'); // eslint-disable-line prefer-promise-reject-errors
    }
  })),
  body('password', 'Password tidak boleh kosong').isLength({ min: 1 }),
];

const updateUserRules = () => [
  body('nama', 'Nama tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('email', 'Email tidak boleh kosong').isLength({ min: 1 }).trim(),
  body('email', 'Format email tidak valid').isEmail().normalizeEmail().trim(),
  body('email').custom((value, { req }) => User.findOne({ where: { email: value } }).then((admin) => { // eslint-disable-line consistent-return
    if (admin && admin.id != req.params.id) { // eslint-disable-line eqeqeq
      return Promise.reject('Email Telah digunakan'); // eslint-disable-line prefer-promise-reject-errors
    }
  })),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
  updateUserRules,
  tambahUserRules,
  validate,
};
