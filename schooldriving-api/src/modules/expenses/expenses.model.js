const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Expenses Schema
 */
const ExpensesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * - pre-post-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ExpensesSchema.method({});

/**
 * Statics
 */
ExpensesSchema.statics = {
  /**
   * Get expenses
   * @param {ObjectId} id - The objectId of expenses.
   * @returns {Promise<Expenses, APIError>}
   */
  async get(id) {
    const expenses = await this.findById(id).populate('owner').exec();
    if (!expenses) {
      throw new APIError('No such expenses exists!', httpStatus.NOT_FOUND);
    }
    return expenses;
  },

  /**
   * List expenses and populate owner details to wich the expenses belongs to.
   * @returns {Promise<Expenses[]>}
   */
  list() {
    return this.find()
      .populate('owner')
      .exec();
  },

  /**
   * List expenses in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of expenses to be skipped.
   * @param {number} limit - Limit number of expenses to be returned.
   * @returns {Promise<Expenses[]>}
   */
  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner')
      .exec();
  },
};

/**
 * @typedef Expenses
 */
module.exports = mongoose.model('Expenses', ExpensesSchema);
