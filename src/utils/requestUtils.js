const http = require('http');
const https = require('https');

const fs = require('fs');
const {HttpError} = require('../../errors');
const { default: axios } = require('axios');


module.exports = {
  async getFileFromUrl(fileUrl, filePath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(filePath);
      const http = fileUrl.startsWith('https') ? https : http;
      
      http.get(fileUrl, function(response) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
        .on('error', (err) => {
          reject(new HttpError(500, err.message));
        });    
    });
  },

  async getJsonData(url) {
    const res = await axios.get(url);
    if (Math.floor(res.status / 100) !== 2)
      throw new HttpError(400, `server for compay responded ${res.status}`);
    return res.data;
  }
};