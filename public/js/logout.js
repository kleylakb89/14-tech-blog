const logout = document.querySelector('#logout');

const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Typer': 'application/json'},
    });

    if (response.ok) {
        document.location.replace('/');
    } else alert('Logout failed');
};

logout.addEventListener('click', logoutHandler);