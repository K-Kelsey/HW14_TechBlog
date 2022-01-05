const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoute = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js')

// add paths to api routes
router.use('/', homeRoute);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;