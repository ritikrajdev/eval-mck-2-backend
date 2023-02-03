const router = require('express').Router();
const { getCompanyList, patchCompanyById} = require('../../controllers/companies');
const {generateValidationMiddleware} = require('../../middlewares/validation');
const { querySchemaForGetCompanies, bodySchemaForPatchCompany } = require('../../schemas/companies');

router.get(
  '',
  generateValidationMiddleware(querySchemaForGetCompanies, 'query'),
  getCompanyList
);

router.patch(
  '/:id',
  generateValidationMiddleware(bodySchemaForPatchCompany),
  patchCompanyById,
);

module.exports = router;