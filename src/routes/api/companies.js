const router = require('express').Router();
const { getCompanyList } = require('../../controllers/companies');
const {generateValidationMiddleware} = require('../../middlewares/validation');
const { querySchemaForGetCompanies } = require('../../schemas/companies');

router.get(
  '',
  generateValidationMiddleware(querySchemaForGetCompanies, 'query'),
  getCompanyList
);

module.exports = router;