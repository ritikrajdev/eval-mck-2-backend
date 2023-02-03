const csvServices = require('../services/csv');

module.exports = {
  async getCsvAndSaveDataController(req, res, next) {
    try {
      const {urlLink} = req.body;
      const createdData = await csvServices.getCsvAndSaveData(urlLink);
      res.json(createdData);
    } catch(err) {
      next(err);
    }
  }
};