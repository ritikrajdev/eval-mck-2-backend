const joi = require('joi');

module.exports = {
  getCsvAndSaveDataSchema: joi.object({
    urlLink: joi
      .string()
      .regex(/^.*\.csv\/?\??.*$/)
      .uri()
      .required()
  })
};