const { DataTypes } = require("sequelize");
const modelRequest = require("./request.model");

function initModels(sequelize) {
	const Request = modelRequest(sequelize, DataTypes);

	return {
		Request,
	};
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
