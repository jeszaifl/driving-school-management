const express = require('express');
const { Joi } = require('express-validation');
const appointmentsCtrl = require('./appointments.controller');
const { validate } = require('../../helpers');

const router = express.Router();

const paramValidation = {
  createAppointments: {
    body: Joi.object({
      title: Joi.string().required(),
      date: Joi.string().required(),
      startTime: Joi.string().required(),
      puTime: Joi.string().required(),
      endTime: Joi.string().required(),
      doTime: Joi.string().required(),
      driver: Joi.string().required(),
      type: Joi.string().required(),
      puLocation: Joi.string().required(),
      instructor: Joi.string().required(),
      vehicle: Joi.string().required(),
      status: Joi.string().required(),
      instrunctionOne: Joi.string().required(),
      instructionTwo: Joi.string().required(),
      notes: Joi.string().required(),
    }),
  },
  updateAppointments: {
    params: Joi.object({
      appointmentsId: Joi.string().required(),
    }),
    body: Joi.object({
      title: Joi.string().required(),
      date: Joi.string().required(),
      startTime: Joi.string().required(),
      puTime: Joi.string().required(),
      endTime: Joi.string().required(),
      doTime: Joi.string().required(),
      driver: Joi.string().required(),
      type: Joi.string().required(),
      puLocation: Joi.string().required(),
      instructor: Joi.string().required(),
      vehicle: Joi.string().required(),
      status: Joi.string().required(),
      instrunctionOne: Joi.string().required(),
      instructionTwo: Joi.string().required(),
      notes: Joi.string().required(),
    }),
  },
};

router.route('/')
  /** GET /api/appointments - Get list of appointments */
  .get(appointmentsCtrl.list)

  /** POST /api/appointments - Create new appointments */
  .post(validate(paramValidation.createAppointments), appointmentsCtrl.create);

router.route('/:appointmentsId')
  /** GET /api/appointments/:appointmentsId - Get appointments */
  .get(appointmentsCtrl.get)

  /** PUT /api/appointments/:appointmentsId - Update appointments */
  .put(validate(paramValidation.updateAppointments), appointmentsCtrl.update)

  /** DELETE /api/appointments/:appointmentsId - Delete appointments */
  .delete(appointmentsCtrl.remove);

/** Load appointments when API with appointmentsId route parameter is hit */
router.param('appointmentsId', appointmentsCtrl.load);

module.exports = router;
