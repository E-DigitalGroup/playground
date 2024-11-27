const mysql = require('mysql2');
const config = require("platformsh-config").config();
const credentials = (config.isValidPlatform()) ? config.credentials('database') : undefined;

const settings = {
  host: credentials ? credentials.host : process.env.DB_HOST,
  user: credentials ? credentials.username : process.env.DB_USER,
  password: credentials ? credentials.password : process.env.DB_PASSWORD,
  database: credentials ? credentials.path : process.env.DB_NAME,
  port: credentials ? credentials.port : process.env.DB_PORT,
  namedPlaceholders: true,
}

const dbConnection = mysql.createPool(settings);

module.exports = dbConnection.promise();