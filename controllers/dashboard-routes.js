const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//withAuth
router.get('/', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
            model: User,
            attributes: ['username']
          },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(data => {
        const posts = data.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //withAuth
  router.get('/edit/:id', (req, res) => {
    Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'post_text',
        'title',
        'created_at'
      ],
      include: [
        {
            model: User,
            attributes: ['username']
          },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(data => {
        if (data) {
          const post = data.get({ plain: true });
          
          res.render('edit-post', {
            post,
            loggedIn: true,
            username: req.session.username
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


module.exports = router;