
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          include: [User]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by id
router.get('/post/:id', async (req, res) => {
  try {
    console.log("Hello");
    const postData = await Post.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name']
      //   },
      //   {
      //     model: Comment,
      //     include: [User]
      //   }
      // ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    const post = postData.get({ plain: true });
console.log(post);
 res.json(post)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPostData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );

    if (!updatedPostData[0]) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!deletedPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post 

module.exports = router;

