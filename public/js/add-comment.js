const comment = document.querySelector('#submit-comment');

const commentHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname;
  const text = document.querySelector('#comment-text').value;
  
  const response = await fetch(`${id}`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      text,
    }),
    headers: {'Content-Type': 'application/json',},
  });

  if (response.ok) {
    document.location.replace(`${id}`);
  } else alert('Failed to add comment');
};

comment.addEventListener('click', commentHandler);