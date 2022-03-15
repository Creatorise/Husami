const login__form = document.querySelector('.login__form');
const login__waiting = document.querySelector('.login__waiting');
const login__rejected = document.querySelector('.login__rejected');

const state = {
    login: 'login',
};

login__form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    console.log(`login__form.addEventListener ~ email`, email);

    set_login_state('waiting');

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
    });
    // if (!response.ok) {
    set_login_state('rejected');
    // return;
    // }
    // set_login_state('waiting');
});

function set_login_state(new_state) {
    state.login = new_state;

    react_to_state();
}

function react_to_state() {
    if (state.login == 'login') {
        login__form.style.display = 'block';
        login__waiting.style.display = 'none';
        return;
    }
    if (state.login == 'waiting') {
        login__form.style.display = 'none';
        login__waiting.style.display = 'block';
        return;
    }
    if (state.login == 'rejected') {
        login__form.style.display = 'none';
        login__waiting.style.display = 'none';
        login__rejected.style.display = 'block';
    }
    if (state.login == 'logged_in') {
        login__form.style.display = 'none';
        login__waiting.style.display = 'none';
        return;
    }
}
