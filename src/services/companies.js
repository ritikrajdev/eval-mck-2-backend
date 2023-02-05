const { HttpError } = require('../../errors');
const db = require('../models');

module.exports = {
  async getCompanyListRankedByScore(sector) {
    const sortedCompaniesByScore = await db.company.findAll({
      where: {sector},
      order: [['score', 'DESC']],
      'attributes': ['id', 'name', 'ceo', 'score']
    });
    return sortedCompaniesByScore.map((company, idx) => {
      // fix a typo here raking -> ranking
      company.dataValues.ranking = idx+1;
      return company;
    });
  },

  async patchCompayById(id, ceo=undefined, name=undefined) {
    const company = await db.company.findByPk(id);
    if (!company)
      throw new HttpError(404, `no company  with id ${id} found`);
    company.ceo = ceo??company.ceo;
    company.name = name??company.name;
    await company.save();
    const keysRequired = ['id', 'name', 'ceo', 'score'];
    const data = {};
    keysRequired.forEach(key => data[key] = company[key]);
    return data;
  }
};