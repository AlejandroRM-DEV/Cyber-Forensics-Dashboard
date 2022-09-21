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
			letter_num: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			letter_year: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			letter_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			submission_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			authorized_by: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			user_id: {
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
