const csvServices = require('../services/csv');

module.exports = {
  async getCsvAndSaveDataController(req, res, next) {
    try {
      const {urlLink} = req.body;
      const createdData = await csvServices.getCsvAndSaveData(urlLink);
      res.status(201).json(createdData);
    } catch(err) {
      next(err);
    }
  }
};