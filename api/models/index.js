const Sequelize = require("sequelize");
const initModels = require("./init-models");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: "mariadb",
});
const models = initModels(sequelize);

module.exports = models;
