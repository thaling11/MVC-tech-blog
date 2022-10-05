const router = require('express').Router();
const { response } = require('express');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//ADD WITHAUTH
router.get('/', (req, res) => {
    Comment.findAll()
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //withAuth
  router.post('/', (req, res) => {
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      })
        .then(data => res.json(data))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
  
  //withAuth
  router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No comment found with the id' });
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