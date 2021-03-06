const blog = document.querySelector('#submit-blog');
const destroy = document.querySelector('#delete-blog');

const blogHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname;
  const title = document.querySelector('#update-title').value;
  const text = document.querySelector('#update-text').value;
  
  const response = await fetch(`${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      title,
      text,
    }),
    headers: {'Content-Type': 'application/json',},
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else alert('Failed to update blog');
};

const deleteHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname;
  const response = await fetch(`${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else alert('Failed to delete blog');
};

blog.addEventListener('click', blogHandler);
destroy.addEventListener('click', deleteHandler);