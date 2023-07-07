
const addCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = event.target.getAttribute('data-id');
    const content = document.querySelector('#comment').value.trim();
  
    // Check if the comment content is not empty
    if (content) {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };
  document.querySelector('.comment-form').addEventListener('submit', addCommentFormHandler);

  