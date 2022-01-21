// dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
// the models
const { Post, User, Comment } = require('../models');
// authorization middleware
const withAuth = require('../utils/auth')

// render the dashboard page after user logs in
router.get('/', withAuth, (req, res) => {
  // gather all posts from database
  Post.findAll({
    where: {
      // use with id from current session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'content',
      'title',
      'date_created',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'commentary', 'post_id', 'user_id', 'date_created'],
        include: [{
          model: User,
          attributes: ['user_name']
        }]
      },
      {
        model: User,
        attributes: ['user_name']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/newpost', withAuth, (req, res) => {
  try {
    if (req.session.logged_in) {
      res.render('new-post', {
        logged_in: req.session.logged_in
      });
      return;
    }
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);
  }

});
// --------------------------------------------------------------------------------------------------------------------------------

// why won't new edit modal pop up?
// testing...

// router.get('/edit', withAuth, (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [{ model: User }],
//         });
//         const post = postData.get({ plain: true });
//         res.render('edit', {
//             post,
//             logged_in: req.session.logged_in
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// ---------------------------------------------------------------------------------------------------------------------------------
// edit a post
router.get('/edit/:id', withAuth, (req, res) => {
  // obtain user posts from database
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'date_created',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'user_name', 'commentary', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['user_name']
        }
      },
      {
        model: User,
        attributes: ['user_name']
      }
    ]
  })
    .then(dbPostData => {
      // if no post by that id exists, return an error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize data before passing to template
      const post = dbPostData.get({ plain: true });
      res.render('edit', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;





// router.get('/', withAuth, async (req,res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Post }],
//         });
//         const user = userData.get({ plain: true });
//         res.render('dashboard', {
//             ...user,
//             logged_in: req.session.logged_in,
//             logged_name: req.session.logged_name,
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

// router.get("/edit/:id", withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [{ model: User }],
//         });
//         const post = postData.get({ plain: true });
//         res.render('edit', {
//             post,
//             logged_in: req.session.logged_in
//         });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });
