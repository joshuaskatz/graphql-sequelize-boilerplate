module.exports = (sequelize, Sequelize) => {
	const { DataTypes } = Sequelize;

	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	User.associate = (models) => {
		User.hasOne(models.Profile, {
			foreignKey: 'userId'
		});
	};

	return User;
};
