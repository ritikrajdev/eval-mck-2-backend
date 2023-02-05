const {getCsvAndSaveData} = require('../../src/services/csv');
const requestUtils = require('../../src/utils/requestUtils');
const csvUtils = require('../../src/utils/csv');
const {company} = require('../../src/models');
const { SERVER_STARTING_URI } = require('../../config');

// write test for getCsvAndSaveData function
describe('getCsvAndSaveData', () => {
  const csvUrl = 'https://mckinsey.com';

  const mockGetFileFromUrl = jest
    .spyOn(requestUtils, 'getFileFromUrl')
    .mockResolvedValue(undefined);
  
  const mockGetCsvDataFromFile = jest
    .spyOn(csvUtils, 'getCsvDataFromFile')
    .mockResolvedValue([
      {company_id: 1, company_sector: 'sector1'},
    ]);
  
  const mockGetJsonData = jest
    .spyOn(requestUtils, 'getJsonData')
    .mockResolvedValueOnce({
      id: 1,
      name: 'company1',
      description: 'desc1',
      ceo: 'Gary Hauck',
      tags: ['x']
    })
    .mockResolvedValue([{
      'companyId': '1',
      'performanceIndex': [{
        'key': 'cpi',
        'value': 0.2
      }, {
        'key': 'cf',
        'value': 30000
      },{
        'key': 'mau',
        'value': 0.1
      },{
        'key': 'roic',
        'value': 20
      }],
    }]);
  
  const mockDbBulkCreate = jest
    .spyOn(company, 'bulkCreate')
    .mockResolvedValue(undefined);
  // returned value doesn't matter
  
  const res = getCsvAndSaveData(csvUrl);
  it('should call getFileFromUrl with correct arguments', async () => {
    expect(mockGetFileFromUrl).toHaveBeenCalledWith(csvUrl, './raw.csv');
  });

  it('should call getCsvDataFromFile with correct arguments', async () => {
    expect(mockGetCsvDataFromFile).toHaveBeenCalledWith('./raw.csv');
  });

  it('should call getJsonData with correct arguments', async () => {
    expect(mockGetJsonData).toHaveBeenCalledWith(`${SERVER_STARTING_URI}/company/1`);
    expect(mockGetJsonData).toHaveBeenCalledWith(`${SERVER_STARTING_URI}/sector?name=sector1`);
  });

  it ('should call getJsonData 2  times', async () => {
    expect(mockGetJsonData).toHaveBeenCalledTimes(2);
  });

  it('should call bulkCreate with correct arguments', async () => {
    expect(mockDbBulkCreate).toHaveBeenCalledWith([{
      id: 1,
      name: 'company1',
      description: 'desc1',
      ceo: 'Gary Hauck',
      tags: ['x'],
      sector: 'sector1',
      score: 6.5,
    }]);
  });

  it('should call bulkCreate 1 time', async () => {
    expect(mockDbBulkCreate).toHaveBeenCalledTimes(1);
  });

  it('should return created items and invalidUrls', async () => {
    const result = await res;
    expect(result).toEqual({
      result: [{
        id: 1,
        name: 'company1',
        description: 'desc1',
        ceo: 'Gary Hauck',
        tags: ['x'],
        sector: 'sector1',
        score: 6.5,
      }],
      invalidCompanyIds: [],
    });
  });
});