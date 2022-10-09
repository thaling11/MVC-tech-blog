const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// GET all on homepage
router.get("/", (req, res) => {
    Post.findAll({
      attributes: ["id", "title", "post_text", "created_at"],
      order: [[ 'created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((data) => {
        const posts = data.map((post) => post.get({ plain: true }));
  
        res.render("homepage", {
          posts,
          loggedIn: req.session.loggedIn,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
  
    res.render("login");
  });
  
  router.get("/post/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_text", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
    
        const post = data.get({ plain: true });
  
        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
          username: req.session.username,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;