const {describe, it} = require('@jest/globals');
const { getCsvAndSaveDataController } = require('../../src/controllers/csv');
const csvServices = require('../../src/services/csv');

describe('getCsvAndSaveDataController', () => {
  const serviceResult = {
    'invalidCompanyIds':[],
    'result': [
      {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'description': 'Nostrum dolorem exercitationem distinctio assumenda aliquam amet consequatur. Facilis corporis quas quasi repudiandae. Provident at quae sit repudiandae minima amet assumenda laboriosam. Maxime nobis dolorem harum a explicabo molestiae sapiente.',
        'ceo': 'Nathaniel Mills',
        'tags': [
          'scalable',
        ],
        'sector': 'Automobile',
        'score': 15.784075000000001
      }
    ]
  };

  const mockGetCsvAndSaveDataService = jest
    .spyOn(csvServices, 'getCsvAndSaveData').mockResolvedValue(serviceResult);
  
  const req = {
    body: {
      urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const next = jest.fn();
    
  getCsvAndSaveDataController(req, res, next);
    
  it('should call getCsvAndSaveData function', () => {
    expect(mockGetCsvAndSaveDataService).toHaveBeenCalled();
  });

  it ('should call res.status function with 201', () => {
    expect(res.status).toHaveBeenCalledWith(201);
  });
    
  it('should call getCsvAndSaveData function with the urlLink from req.body', () => {
    expect(mockGetCsvAndSaveDataService).toHaveBeenCalledWith(req.body.urlLink);
  });
    
  it('should call res.json function', () => {
    expect(res.json).toHaveBeenCalled();
  });

  it('should call next on error', async () => {
    const error = new Error('error');
    mockGetCsvAndSaveDataService.mockRejectedValue(error);
    await getCsvAndSaveDataController(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
