const login__form = document.querySelector('.login__form');
console.log(`login__form`, login__form);

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
        body: JSON.stringify({ email }),
    });
    console.log(`login__form.addEventListener ~ response`, response);
    if (!response.ok) {
        console.log(`login__form.addEventListener ~ response.status`, response.status);
        return;
    }
});
