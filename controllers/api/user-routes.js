const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const authorize = require('../../utils/auth');

//GET all
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//GET by ID
  router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_text', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title', 'post_id']
          }
        }
      ]
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;