module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		"Request",
		{
			request_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			agency: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			ci_num: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			ci_year: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			o_num: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			o_year: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			o_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			citizen: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "requests",
			timestamps: false,
		}
	);
