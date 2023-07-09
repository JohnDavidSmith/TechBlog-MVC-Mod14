
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['name'],
      }, { model: Comment, include: [User] }],
    });

    const posts = postData.map((item) => item.get({ plain: true }));
    console.log(posts)
    console.log(posts[0])
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        //   // Add any conditions for filtering the data if necessary
        user_id: req.session.user_id
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const userData = await User.findByPk(req.session.user_id)
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('dashboard', {
      user,
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router;
