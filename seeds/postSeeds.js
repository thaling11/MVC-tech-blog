const { Post } = require('../models');

const postInput = [
  {
    title: 'What is MySQL2?',
    post_text: 'A relational database organizes data into one or more data tables in which data may be related to each other; these relations help structure the data. SQL is a language programmers use to create, modify and extract data from the relational database, as well as control user access to the database. In addition to relational databases and SQL, an RDBMS like MySQL works with an operating system to implement a relational database in a computers storage system, manages users, allows for network access and facilitates testing database integrity and creation of backups.',
    user_id: 1,
  },
  {
    title: 'Just used Bcrypt for the first time!',
    post_text: 'Read about Bcrypt and used it successfully, here is a quick description: Bcrypt is used for secure password hashing. The main difference with regular digest algorithms such as MD5 or SHA256 is that the bcrypt algorithm is specifically designed to be CPU intensive in order to protect against brute force attacks.',
    user_id: 2,
  },
  {
    title: 'Model View Controller',
    post_text: 'Hi everyone, I found a great resource on MVCs. Here you go: https://developer.mozilla.org/en-US/docs/Glossary/MVC',
    user_id: 3,
  },
  {
    title: 'Question about Sequalize',
    post_text: 'I need some help with using Sequalize! How do I use Sequalize in my server.js file?',
    user_id: 4,
  }
]

const seedPosts = () => Post.bulkCreate(postInput);

module.exports = seedPosts;