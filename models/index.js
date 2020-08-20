import Sequelize from 'sequelize';
import path from 'path';

//Add your URI in the .env-cmdrc.json file!
const sequelize = new Sequelize(process.env.DATABASE_URI, {
	//Look up sequelize documentation if using non-postgres databases!
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			//Necessary for use with heroku
			rejectUnauthorized: false
		}
	},
	define: {
		//Add createdAt/updateAt manually if needed
		timestamps: false
	}
});

sequelize
	.authenticate()
	.then(() => console.log('Connected to db'))
	.catch((e) => console.log(e));

const db = {
	User: require(path.join(__dirname, './user'))(sequelize, Sequelize),
	Profile: require(path.join(__dirname, './profile'))(sequelize, Sequelize)
};

Object.keys(db).forEach((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
