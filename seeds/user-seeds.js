const { User } = require('../models');

const userInput = [
  {
    username: "kjones34",
    email: "kjones@gmail.com",
    password: "123456789"
  },
  {
    username: "lklvr101",
    email: "lklvr@gmail.com",
    password: "123456789"
  },
  {
    username: "yetilf44",
    email: "yetilf@gmail.com",
    password: "123456789"
  },
  {
    username: "playaqn20",
    email: "playaqn@gmail.com",
    password: "123456789"
  }
];

const seedUsers = () => User.bulkCreate(userInput);

module.exports = seedUsers;