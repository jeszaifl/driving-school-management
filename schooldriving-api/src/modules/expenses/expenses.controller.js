const httpStatus = require('http-status');
const Expenses = require('./expenses.model');
const APIError = require('../../helpers/APIError');

/**
 * Load expenses and append to req.
 */
async function load(req, res, next, id) {
  try {
    const expenses = await Expenses.get(id);
    req.expenses = expenses;
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get expenses
 * @returns {Expenses}
 */
function get(req, res) {
  return res.json(req.expenses);
}

/**
 * Create new expenses
 * @property {string} req.body.title - The name of expenses.
 * @property {string} req.body.category - Author name of expenses.
 * @property {string} req.body.value- The value of expenses.
 * @returns {Expenses}
 */
async function create(req, res, next) {
  const expenses = new Expenses(req.body);

  try {
    const savedExpenses = await expenses.save();
    return res.json(savedExpenses);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing expenses
 * @property {string} req.body.title - The name of expenses.
 * @property {string} req.body.category - Author name of expenses.
 * @property {string} req.body.value- The value of expenses.
 * @returns {Expenses}
 */
async function update(req, res, next) {
  const { expenses } = req;
  expenses.title = req.body.title || expenses.title;
  expenses.category = req.body.category || expenses.category;
  expenses.description = req.body.description || expenses.description;
  expenses.value = req.body.value || expenses.value;
  try {
    const savedExpenses = await expenses.save();
    return res.json(savedExpenses);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get expenses list.
 * @returns {Expenses[]}
 */
async function list(req, res, next) {
  try {
    const expensess = await Expenses.list();
    return res.json(expensess);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete expenses.
 * @returns {Expenses}
 */
async function remove(req, res, next) {
  const { expenses } = req;
  try {
    const deletedExpenses = await expenses.remove();
    return res.json(deletedExpenses);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
};
