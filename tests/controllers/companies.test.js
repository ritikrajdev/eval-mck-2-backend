const { getCompanyList, patchCompanyById} = require('../../src/controllers/companies');
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

  it('should call next with error', async () => {
    const error = new Error('error');
    mockGetCompanyListRankedByScore.mockRejectedValue(error);
    await getCompanyList(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});

// create test  for patchCompanyById controller with mocking
describe('patchCompanyById', () => {
  const req = {
    params: {
      id: '1'
    },
    body: {
      'ceo': 'CEO A',
      'name': 'Company A'
    }
  };

  const res = {
    json: jest.fn()
  };

  const next = jest.fn();

  const mockedPatchCompanyIdService = jest.spyOn(companyServices, 'patchCompayById').mockResolvedValue({
    'id': '1',
    'name': 'Company A',
    'ceo': 'CEO A',
    'score': 11
  });

  patchCompanyById(req, res, next);

  it('should execute res.json', async () => {
    expect(res.json).toHaveBeenCalledWith({
      'id': '1',
      'name': 'Company A',
      'ceo': 'CEO A',
      'score': 11
    });
  });

  it('should call patchCompanyIdService with id, ceo, name', async () => {
    expect(mockedPatchCompanyIdService)
      .toHaveBeenCalledWith(req.params.id, req.body.ceo, req.body.name);
  });

  it('should call next with error', async () => {
    const error = new Error('error');
    mockedPatchCompanyIdService.mockRejectedValue(error);
    await patchCompanyById(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});