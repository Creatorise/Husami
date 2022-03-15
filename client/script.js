const login__form = document.querySelector('.login__form');

//! Debug
// displayLogin(false);

login__form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    console.log(`login__form.addEventListener ~ email`, email);

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        return;
    }

    displayLogin(false);
});

function displayLogin(bool) {
    console.log(
        `displayLogin ~ document.querySelector('.login')`,
        document.querySelector('.login')
    );
    if (bool) {
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.logged-in').style.display = 'none';
        return;
    }
    document.querySelector('.login').style.display = 'none';
    document.querySelector('.logged-in').style.display = 'block';
}
