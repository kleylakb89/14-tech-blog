const blog = document.querySelector('#submit-blog');

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

blog.addEventListener('click', blogHandler);