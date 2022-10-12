const { Comment } = require('../models');

const commentInput = [
  {
    comment_text: "Very interesting post and link, thanks for sharing.",
    post_id: 3,
    user_id: 1
  },
  {
    comment_text: "Thanks for the post! This helps in understanding MySQL!",
    post_id: 1,
    user_id: 4
  },
  {
    comment_text: "You need to wrap app.listen in sequalize.sync({ force: false }).then(() => {... });",
    post_id: 4,
    user_id: 2
  },
  {
    comment_text: "Don't forget to add the route: 'const sequelize = require('./config/connection')';",
    post_id: 4,
    user_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentInput);

module.exports = seedComments;