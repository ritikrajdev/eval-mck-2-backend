const fs = require('fs');

const {parse} = require('fast-csv');
const { HttpError } = require('../../errors');

module.exports = {
  async getCsvDataFromFile(csvFilePath) {
    return new Promise((resolve, reject) => {
      try {
        let data = [];
        fs.createReadStream(csvFilePath)
          .pipe(parse({ headers: true }))
          .on('error', err => reject(new HttpError(400, `invalid data found in csv: ${err.message}`)))
          .on('data', row => data.push(row))
          .on('end', () => resolve(data));
      } catch(err) {
        reject(err);
      }
    });
  }
};