const comment = document.querySelector('#submit-comment');

const commentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value;
  
  const response = await fetch('/blog/:id', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      text,
    }),
    headers: {'Content-Type': 'application/json',},
  });

  if (response.ok) {
    document.location.replace('/blog/:id');
  } else alert('Failed to add comment');
};

comment.addEventListener('click', commentHandler);