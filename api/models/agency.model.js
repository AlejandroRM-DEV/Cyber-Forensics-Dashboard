module.exports = (sequelize, DataTypes) =>
	sequelize.define(
		"agency",
		{
			agency_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "agencies",
			timestamps: false,
		}
	);
