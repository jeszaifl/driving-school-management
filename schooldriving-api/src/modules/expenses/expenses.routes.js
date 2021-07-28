const express = require('express');
const { Joi } = require('express-validation');
const expensesCtrl = require('./expenses.controller');
const { validate } = require('../../helpers');

const router = express.Router();

const paramValidation = {
  createExpenses: {
    body: Joi.object({
      title: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
      date: Joi.string().required(),
    }),
  },
  updateExpenses: {
    params: Joi.object({
      expensesId: Joi.string().required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
      date: Joi.string().required(),
    }),
  },
};

router.route('/')
  /** GET /api/expensess - Get list of expensess */
  .get(expensesCtrl.list)

  /** POST /api/expensess - Create new expenses */
  .post(validate(paramValidation.createExpenses), expensesCtrl.create);

router.route('/:expensesId')
  /** GET /api/expensess/:expensesId - Get expenses */
  .get(expensesCtrl.get)

  /** PUT /api/expensess/:expensesId - Update expenses */
  .put(validate(paramValidation.updateExpenses), expensesCtrl.update)

  /** DELETE /api/expensess/:expensesId - Delete expenses */
  .delete(expensesCtrl.remove);

/** Load expenses when API with expensesId route parameter is hit */
router.param('expensesId', expensesCtrl.load);

module.exports = router;
