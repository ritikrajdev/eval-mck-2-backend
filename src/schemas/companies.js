const joi = require('joi');

module.exports = {
  querySchemaForGetCompanies: joi.object({
    sector: joi
      .string()
      .required()
  }),

  bodySchemaForPatchCompany: joi.object({
    name: joi.string().max(255),
    ceo: joi.string().max(255)
  }).min(1),
};