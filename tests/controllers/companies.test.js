const { getCompanyList } = require('../../src/controllers/companies');
const companyServices = require('../../src/services/companies');

describe('getCompanyList', () => {
  const req = {
    query: {
      sector: 'Automobile'
    }
  };

  const res = {
    json: jest.fn()
  };

  const next = jest.fn();

  const filteredCompanyList = [
    {
      id: 1,
      name: 'Company A',
      ceo: 'CEO A',
      sector: 'Energy',
      score: 0.5
    },
  ];

  const mockGetCompanyListRankedByScore = jest
    .spyOn(companyServices, 'getCompanyListRankedByScore')
    .mockResolvedValue(filteredCompanyList);

  getCompanyList(req, res, next);
  it('should execute res.json', async () => {        
    expect(res.json).toHaveBeenCalledWith(filteredCompanyList);
  });

  it ('should call getCompanyListRankedByScore with sector', async () => {
    expect(mockGetCompanyListRankedByScore).toHaveBeenCalledWith(req.query.sector);
  });
});