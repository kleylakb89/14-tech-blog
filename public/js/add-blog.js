const blog = document.querySelector('#submit-blog');

const blogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value;
  const text = document.querySelector('#blog-text').value;
  
  const response = await fetch('/dashboard/new', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      title,
      text,
    }),
    headers: {'Content-Type': 'application/json',},
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else alert('Failed to add blog');
};

blog.addEventListener('click', blogHandler);