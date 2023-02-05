const { getJsonData, getFileFromUrl } = require('../../src/utils/requestUtils');
const axios = require('axios');
const { HttpError } = require('../../errors');

const https = require('https');
const http = require('http');

describe('getJsonData', () => {
  const mockAxiosGet = jest
    .spyOn(axios, 'get')
    .mockResolvedValue({ status: 200, data: { test: 'test' } });

  const res = getJsonData('url');

  it('should call axios.get with correct arguments', async () => {
    expect(mockAxiosGet).toHaveBeenCalledWith('url');
  });

  it('should return correct data', async () => {
    const result = await res;
    expect(result).toEqual({ test: 'test' });
  });

  it('should throw HttpError if status is not 2xx', async () => {
    mockAxiosGet.mockResolvedValue({ status: 400, data: {} });
    await expect(getJsonData('url')).rejects.toThrowError(HttpError);
  });
});


describe('getFileFromUrl', () => {
  const mockReturnVal = { on: jest.fn().mockReturnThis() };

  const mockHttpGet = jest
    .spyOn(http, 'get')
    .mockReturnValue(mockReturnVal);
  const mockHttpsGet = jest
    .spyOn(https, 'get')
    .mockReturnValue(mockReturnVal);

  getFileFromUrl('https://mckinsey.com', 'toDelete.html');
  it('should call https.get', async () => {
    expect(mockHttpsGet).toHaveBeenCalled();
  });
  it('should call on', async () => {
    expect(mockReturnVal.on).toHaveBeenCalled();
  });

  getFileFromUrl('http://mckinsey.com', 'toDelete.html');
  it('should call http.get', async () => {
    expect(mockHttpGet).toHaveBeenCalled();
  });
  it('should call on', async () => {
    expect(mockReturnVal.on).toHaveBeenCalled();
  });
});
