
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// POST /api/posts/:postId/comments
router.post('/:postId/comments', async (req, res) => {
  // Retrieve postId from request parameters
  const { postId } = req.params;
  
  // Retrieve comment content from request body
  // const { content } = req.body;
  
  // Your code to create the new comment using the postId and content
  try {
    const newCommentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: postId
    });

    res.status(200).json(newCommentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
  
//   // Send a response indicating the comment was created successfully
//   res.status(200).json({ message: 'Comment created successfully' });
// });

module.exports = router;

