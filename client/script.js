const login__form = document.querySelector('.login__form');

//! Debug
displayLogin(false);
add_user_table_row({
    email: 'test email',
    role: 'admin',
});

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

function add_user_table_row(user) {
    const user_table = document.querySelector('.user_table');

    const user_row = document.createElement('tr');
    const user_email_cell = document.createElement('td');
    const user_role_cell = document.createElement('td');

    user_row.appendChild(user_email_cell);
    user_row.appendChild(user_role_cell);

    user_email_cell.innerText = user.email;
    user_role_cell.innerText = user.role;

    user_table.appendChild(user_row);
}
