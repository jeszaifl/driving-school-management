const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');

/**
 * Appointments Schema
 */
const AppointmentsSchema = new mongoose.Schema({
  googleEmail: {
    type: String,
    required: true
  },
  googleCalendarId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  puTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  doTime: {
    type: String,
    required: true
  },
  driver: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  puLocation: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  instrunctionOne: {
    type: String,
    required: true
  },
  instructionTwo: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
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
AppointmentsSchema.method({});

/**
 * Statics
 */
AppointmentsSchema.statics = {
  /**
   * Get expenses
   * @param {ObjectId} id - The objectId of expenses.
   * @returns {Promise<Appointments, APIError>}
   */
  async get(id) {
    const expenses = await this.findById(id).populate('owner').exec();
    if (!expenses) {
      throw new APIError('No such expenses exists!', httpStatus.NOT_FOUND);
    }
    return expenses;
  },

  async getAppointmentByGmail(googleEmail) {
    const appointments = await this.find({ googleEmail }).populate('owner').exec();
    if (!appointments) {
      throw new APIError('No such appointments exists!', httpStatus.NOT_FOUND);
    }
    return appointments;
  },

  async getAppointmentsByUserId(userId) {
    const expenses = await this.find({ userId }).populate('owner').exec();
    if (!expenses) {
      throw new APIError('No such expenses exists!', httpStatus.NOT_FOUND);
    }
    return expenses;
  },

  /**
   * List expenses and populate owner details to wich the expenses belongs to.
   * @returns {Promise<Appointments[]>}
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
   * @returns {Promise<Appointments[]>}
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
 * @typedef Appointments
 */
module.exports = mongoose.model('Appointments', AppointmentsSchema);
