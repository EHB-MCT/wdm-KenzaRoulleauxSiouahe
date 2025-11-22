require("dotenv").config();

module.exports = {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	cluster: process.env.DB_CLUSTER,
	dbName: process.env.DB_NAME,
};
