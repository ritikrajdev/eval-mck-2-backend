const { getCsvDataFromFile } = require('../../src/utils/csv');

// test for getCsvDataFromFile
// not a unit test could't think of any other way to test it
describe('getCsvDataFromFile', () => {
  it('should return correct data', async () => {
    const data = await getCsvDataFromFile('./tests/utils/test.csv');
    expect(data).toEqual([
      { id: '1', name: 'test1' },
      { id: '2', name: 'test2' },
      { id: '3', name: 'test3' },
    ]);
  });
});