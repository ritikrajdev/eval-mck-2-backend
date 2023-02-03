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

  async patchCompanyById(req, res, next) {
    try {
      const {id} = req.params;
      const {ceo, name} = req.body;
      const patchedCompany = await companyServices.patchCompayById(id, ceo, name);
      res.json(patchedCompany);
    }
    catch (err) {
      next(err);
    }
  }
};