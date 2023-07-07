
const router = require('express').Router();

// POST /api/posts/:postId/comments
router.post('/api/posts/:postId/comments', (req, res) => {
  // Retrieve postId from request parameters
  const { postId } = req.params;
  
  // Retrieve comment content from request body
  const { content } = req.body;
  
  // Your code to create the new comment using the postId and content
  
  // Send a response indicating the comment was created successfully
  res.status(200).json({ message: 'Comment created successfully' });
});

module.exports = router;

