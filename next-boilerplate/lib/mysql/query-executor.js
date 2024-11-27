const dbConnection = require('./mysql');


const queryExecutor = (query, params) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(params ? await dbConnection.query(query, params) : await dbConnection.query(query));
    } catch (e) {
      reject(e.toString())
    }
  });
}

module.exports = {
  queryExecutor,
};