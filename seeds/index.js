const userSeeds = require('./user-seeds');
const commentSeeds = require('./commentSeeds');
const postSeeds = require('./postSeeds');

const sequelize = require('../config/connection');

const seedInit = async() => {
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await commentSeeds();
    process.exit(0);
};

seedInit();