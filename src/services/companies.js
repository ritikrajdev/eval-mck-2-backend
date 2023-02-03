const db = require('../models');

module.exports = {
  async getCompanyListRankedByScore(sector) {
    const sortedCompaniesByScore = await db.company.findAll({
      where: {sector},
      order: [['score', 'DESC']]
    });
    return sortedCompaniesByScore.map((company, idx) => {
      company.dataValues.raking = idx+1;
      return company;
    });
  }
};