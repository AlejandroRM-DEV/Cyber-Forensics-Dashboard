const { DataTypes } = require("sequelize");
const modelAgency = require("./agency.model");
const modelRequest = require("./request.model");

function initModels(sequelize) {
	const Agency = modelAgency(sequelize, DataTypes);
	const Request = modelRequest(sequelize, DataTypes);
	Request.belongsTo(Agency, {
		foreignKey: {
			name: "agency_id"
		},
	});
	return {
		sequelize,
		Request,
		Agency,
	};
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
