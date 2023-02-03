const router = require('express').Router();
const {getCsvAndSaveDataController} = require('../../controllers/csv');
const {generateValidationMiddleware} = require('../../middlewares/validation');
const {getCsvAndSaveDataSchema} = require('../../schemas/csv');

router.post(
  '/save',
  generateValidationMiddleware(getCsvAndSaveDataSchema),
  getCsvAndSaveDataController
);

module.exports = router;