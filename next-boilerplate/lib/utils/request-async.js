const request = require('request');

const doRequest = (option) => {
  return new Promise(function (resolve, reject) {
    request(option, function (error, response) {
      if (response && response.statusCode >= 200 && response.statusCode < 400 && response.body) {
        resolve({ status: true, data: JSON.parse(response.body) })
      } else if (error) {
        resolve({ status: false })
      } else {
        resolve({ status: false, data: response && response.body ? JSON.parse(response.body) : {} })
      }
    });
  });
}

module.exports = {
  doRequest,
};