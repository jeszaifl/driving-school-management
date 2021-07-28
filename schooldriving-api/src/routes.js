const express = require('express');
const expressJwt = require('express-jwt');
const config = require('./config');
const userRoutes = require('./modules/user/user.routes');
const authRoutes = require('./modules/auth/auth.routes');
const expensesRoutes = require('./modules/expenses/expenses.routes');

const appointmentsRoutes = require('./modules/appointments/appointments.routes');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount expenses routes at /expensess
router.use('/expenses', expensesRoutes);

// mount appointments routes at /appointmentss
router.use('/appointments', appointmentsRoutes);

module.exports = router;
