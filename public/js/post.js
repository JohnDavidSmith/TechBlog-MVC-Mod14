
const creatPostFormHandler = async (event) => {
  event.preventDefault();
  // console.log("Hello");
  const content = document.querySelector('#comment').value.trim();
  const title = document.querySelector('#title').value.trim();

  // postId = document.querySelector('#postId').value.trim();
  let response = "";
  if (content) {
    response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    }
    )
    console.log(response);
  }

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to add comment');
  }
};
document.querySelector('.comment-form').addEventListener('submit', creatPostFormHandler);

const delButtonHandler = async (event) => {

  console.log("click")

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert('Failed to delete project');
    }
  }
};
document.querySelector('#delete').addEventListener('click', delButtonHandler);

const editButtonHandler = async (event) => {

  console.log("click")

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/post/${id}`, {
      method: 'GET',
    });
    console.log(response);
    if (response.ok) {
      // document.location.replace('/dashboard');
      // console.log(await response.json());
      var data=await response.json();
    document.querySelector("#title").value=data.title
    document.querySelector("#comment").value=data.content
    } else {
      alert('Failed to delete project');
    }
  }
};
document.querySelector('#edit').addEventListener('click', editButtonHandler);
 
const saveButtonHandler = async (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute('data-id');
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#comment').value.trim();

   // Check if title or content is empty
   if (!title || !content) {
    alert('Please enter both title and content or press EDIT button');
    return;
  }

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to save post');
  }
};

document.querySelector('#save').addEventListener('click', saveButtonHandler); 
 
