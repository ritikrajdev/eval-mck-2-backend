const joi = require('joi');

module.exports = {
  querySchemaForGetCompanies: joi.object({
    sector: joi
      .string()
      .required()
  })
};