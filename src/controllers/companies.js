const companyServices  = require('../services/companies.js');

module.exports = {
  async getCompanyList(req, res, next) {
    try {
      const {sector} = req.query;
      const filteredCompanyList = await companyServices.getCompanyListRankedByScore(sector);
      res.json(filteredCompanyList);
    } catch (err) {
      next(err);
    }
  },
};