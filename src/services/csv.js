const { SERVER_STARTING_URI } = require('../../config');
const { getCsvDataFromFile } = require('../utils/csv');
const { getFileFromUrl, getJsonData } = require('../utils/requestUtils');

const db = require('../models');

module.exports = {
  async getCsvAndSaveData(csvUrl) {
    const csvFilePath = './raw.csv';
    
    await getFileFromUrl(csvUrl, csvFilePath);

    const sectorAndCompanyData = await getCsvDataFromFile(csvFilePath);
    
    let companyData = await Promise.all(sectorAndCompanyData.map(({company_id}) => {
      try {
        return getJsonData(`${SERVER_STARTING_URI}/company/${company_id}`);
      } catch (err) {
        if (err.code === 400)
          return null;
        else throw err;
      }
    }));
    companyData = companyData.fillter(company => company !== null);

    const updatedCompanies = {};
    const allUniqueSectorsAsMap = {};
    const invalidCompanyIds = [];
    companyData.forEach((company, idx) => {
      const sector = sectorAndCompanyData[idx].company_sector;
      company['sector'] = sector;

      if (!allUniqueSectorsAsMap[sector])
        allUniqueSectorsAsMap[sector] = 1;

      updatedCompanies[company.id] = company;
    });

    const uniqueSectors = Object.keys(allUniqueSectorsAsMap);
    let performaneIndexData = await Promise.all(uniqueSectors.map(sector => {
      try {
        return getJsonData(`${SERVER_STARTING_URI}/sector?name=${sector}`);
      }
      catch (err) {
        if (err.code === 400)
          return null;
        else throw err;
      }
    }));
    performaneIndexData = performaneIndexData.filter(data => data !== null);

    performaneIndexData.forEach(companies => {
      companies.forEach(company => {
        const piMap = {};
        company.performanceIndex.forEach(pi => {
          piMap[pi['key']] = pi['value'];
        });

        const {cpi, cf, mau, roic} = piMap;
        try {
          updatedCompanies[company.companyId].score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
        }
        catch (err) {
          invalidCompanyIds.push(company.companyId);
        }
      });
    });

    const companies = Object.values(updatedCompanies);
    await db.company.bulkCreate(companies);
    return {invalidCompanyIds, result: companies};
  } 
};