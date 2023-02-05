const { getCompanyListRankedByScore, patchCompayById } = require('../../src/services/companies');
const {company} = require('../../src/models');
const { HttpError } = require('../../errors');

describe('getCompanyListRankedByScore', () => {
  const mockDbFindAll = jest
    .spyOn(company, 'findAll')
    .mockResolvedValue([{
      dataValues: {
        id: 1,
        name: 'company1',
        ceo: 'Gary Hauck',
        score: 0.2,
      }}, {
      dataValues: {
        id: 2,
        name: 'company2',
        ceo: 'Gary Hauck',
        score: 0.1,
      }}
    ]);
  const res = getCompanyListRankedByScore('sector1');

  it('should call company.findAll with correct arguments', async () => {
    expect(mockDbFindAll).toHaveBeenCalledWith({
      where: {sector: 'sector1'},
      order: [['score', 'DESC']],
      'attributes': ['id', 'name', 'ceo', 'score']
    });
  });

  it('should return correct data', async () => {
    const result = await res;
    expect(result).toEqual([{
      dataValues: {
        id: 1,
        name: 'company1',
        ceo: 'Gary Hauck',
        score: 0.2,
        ranking: 1
      }}, {
      dataValues: {
        id: 2,
        name: 'company2',
        ceo: 'Gary Hauck',
        score: 0.1,
        ranking: 2
      }}
    ]);
  });
});

describe('patchCompayById', () => {
  const mockDbFindByPk = jest
    .spyOn(company, 'findByPk')
    .mockResolvedValue({
      id: 1,
      ceo: 'Gary Hauck',
      name: 'company1',
      description: 'company1',
      tags: [],
      sector: 'sector1',
      score: 0.2,
      save: jest.fn()
    });
  const res = patchCompayById(1, 'Gary', 'company1');

  it('should call company.findByPk with correct arguments', async () => {
    expect(mockDbFindByPk).toHaveBeenCalledWith(1);
  });

  it('should return correct data', async () => {
    const result = await res;
    expect(result).toEqual({
      id: 1,
      name: 'company1',
      ceo: 'Gary',
      score: 0.2
    });
  });

  it('should throw error when no company found', async () => {
    mockDbFindByPk.mockResolvedValue(undefined);
    await expect(patchCompayById(1, 'Gary', 'company1'))
      .rejects
      .toThrow(HttpError);
  });
});