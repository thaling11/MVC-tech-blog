const userSeeds = require('./user-seeds');

const sequelize = require('../config/connection');

const seedInit = async() => {
    await sequelize.sync({ force: true });
    await userSeeds();
    process.exit(0);
};

seedInit();