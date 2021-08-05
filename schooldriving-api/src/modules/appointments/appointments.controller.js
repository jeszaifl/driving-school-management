const httpStatus = require('http-status');
const Appointments = require('./appointments.model');
const APIError = require('../../helpers/APIError');

/**
 * Load appointments and append to req.
 */
async function load(req, res, next, id) {
  try {
    const appointments = await Appointments.get(id);
    req.appointments = appointments;
    return next();
  } catch (error) {
    return next(error);
  }
}

/**
 * Get appointments
 * @returns {Appointments}
 */
function get(req, res) {
  return res.json(req.appointments);
}

async function getByGmail(req, res, next) {
  const { body } = req;
  try {
    const googleAppointments = await Appointments.getAppointmentByGmail(body.googleEmail);
    return res.json(googleAppointments);
  } catch (error) {
    return next(error);
  }
}

/**
 * Create new appointments
 * @property {string} req.body.title - The name of appointments.
 * @property {string} req.body.category - Author name of appointments.
 * @property {string} req.body.value- The value of appointments.
 * @returns {Appointments}
 */
async function create(req, res, next) {
  const appointments = new Appointments(req.body);
  try {
    const savedAppointments = await appointments.save();
    return res.json(savedAppointments);
  } catch (error) {
    return next(error);
  }
}

/**
 * Update existing appointments
 * @property {string} req.body.title - The name of appointments.
 * @property {string} req.body.category - Author name of appointments.
 * @property {string} req.body.value- The value of appointments.
 * @returns {Appointments}
 */
async function update(req, res, next) {
  const { appointments } = req;
  appointments.googleEmail = req.body.googleEmail || appointments.googleEmail;
  appointments.googleCalendarId = req.body.googleCalendarId || appointments.googleCalendarId;
  appointments.userId = req.body.userId || appointments.userId;
  appointments.title = req.body.title || appointments.title;
  appointments.date = req.body.date || appointments.date;
  appointments.startTime = req.body.startTime || appointments.startTime;
  appointments.puTime = req.body.puTime || appointments.puTime;
  appointments.endTime = req.body.endTime || appointments.endTime;
  appointments.doTime = req.body.doTime || appointments.doTime;
  appointments.driver = req.body.driver || appointments.driver;
  appointments.type = req.body.type || appointments.type;
  appointments.puLocation = req.body.puLocation || appointments.puLocation;
  appointments.instructor = req.body.instructor || appointments.instructor;
  appointments.vehicle = req.body.vehicle || appointments.vehicle;
  appointments.status = req.body.status || appointments.status;
  appointments.instrunctionOne = req.body.instrunctionOne || appointments.instrunctionOne;
  appointments.instructionTwo = req.body.instructionTwo || appointments.instructionTwo;
  appointments.notes = req.body.notes || appointments.notes;

  try {
    const savedAppointments = await appointments.save();
    return res.json(savedAppointments);
  } catch (error) {
    return next(error);
  }
}

/**
 * Get appointments list.
 * @returns {Appointments[]}
 */
async function list(req, res, next) {
  try {
    const appointmentss = await Appointments.list();
    return res.json(appointmentss);
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete appointments.
 * @returns {Appointments}
 */
async function remove(req, res, next) {
  const { appointments } = req;
  try {
    const deletedAppointments = await appointments.remove();
    return res.json(deletedAppointments);
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
  getByGmail,
};
