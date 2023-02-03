const router = require('express').Router();

const {handleErrors} = require('../../middlewares/errorHandler');
const csvRoutes = require('./csv');

router.use('', csvRoutes);

router.use(handleErrors);

module.exports = router;
