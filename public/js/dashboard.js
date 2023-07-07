
// Fetch and display the user's blog posts
const getUserPosts = async () => {
    const response = await fetch('/api/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      const posts = await response.json();
      // Display the posts on the dashboard
      // Implement your logic here
    } else {
      alert('Failed to fetch user posts');
    }
  };
  
  // Call the function to fetch and display the user's blog posts
  getUserPosts();

  function deletePost () {
    console.log("clicked")
    
    }
    
    const deleteButton = document.getElementById("postDelete");
    
    deleteButton.addEventListener('click', deletePost);