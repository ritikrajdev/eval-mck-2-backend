const router = require('express').Router();

const {handleErrors} = require('../../middlewares/errorHandler');
const csvRoutes = require('./csv');
const companiesRoutes = require('./companies');

router.use('', csvRoutes);
router.use('/companies', companiesRoutes);

router.use(handleErrors);

module.exports = router;
