export { login };

const state = {
    login: 'input',
};

const set_state = {
    login: (new_state) => {
        state.login = new_state;
        render_login_state();
    },
};

function login() {
    set_state.login('input');

    const login__form = document.querySelector('.login__form');
    login__form.addEventListener('submit', submit);
}

async function submit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    set_state.login('waiting');

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
    });

    set_state.login('logged_in');
}

function render_login_state() {
    const elements = {
        input: document.querySelector('.login_state--input'),
        waiting: document.querySelector('.login_state--waiting'),
        rejected: document.querySelector('.login_state--rejected'),
        logged_in: document.querySelector('.login_state--logged_in'),
    };

    const render_functions = {
        input() {
            console.log(`render_functions ~ input`);
            set_display(elements.input, true);
            set_display(elements.waiting, false);
            set_display(elements.rejected, false);
            set_display(elements.logged_in, false);
        },
        waiting() {
            console.log(`render_functions ~ waiting`);
            set_display(elements.input, false);
            set_display(elements.waiting, true);
            set_display(elements.rejected, false);
            set_display(elements.logged_in, false);
        },
        rejected() {
            console.log(`render_functions ~ rejected`);
            set_display(elements.input, false);
            set_display(elements.waiting, false);
            set_display(elements.rejected, true);
            set_display(elements.logged_in, false);
        },
        logged_in() {
            console.log(`render_functions ~ logged_in`);
            set_display(elements.input, false);
            set_display(elements.waiting, false);
            set_display(elements.rejected, false);
            set_display(elements.logged_in, true);
        },
    };
    if (typeof render_functions[state.login] != 'function') return;

    render_functions[state.login]();
}

function set_display(element, bool) {
    element.style.display = bool ? 'block' : 'none';
}

// function login() {
// const login_states = create_enumerable();
// console.log(`login ~ login_states`, login_states);

// const login_state = {
//     input: () => {},
//     waiting: () => {},
//     rejections: () => {},
// };

// const set_login_state = create_state_switch('login_state_switch', {});

// set_login_state.to.input()

// const login__form = document.querySelector('.login__form');
// const login__waiting = document.querySelector('.login__waiting');
// const login__rejected = document.querySelector('.login__rejected');
// }

// login__form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     console.log(`login__form.addEventListener ~ email`, email);

//     set_login_state('waiting');

//     const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email }),
//     });
//     // if (!response.ok) {
//     set_login_state('rejected');
//     // return;
//     // }
//     // set_login_state('waiting');
// });

// function set_login_state(new_state) {
//     state.login = new_state;

//     react_to_state();
// }

// function react_to_state() {
//     if (state.login == 'login') {
//         login__form.style.display = 'block';
//         login__waiting.style.display = 'none';
//         return;
//     }
//     if (state.login == 'waiting') {
//         login__form.style.display = 'none';
//         login__waiting.style.display = 'block';
//         return;
//     }
//     if (state.login == 'rejected') {
//         login__form.style.display = 'none';
//         login__waiting.style.display = 'none';
//         login__rejected.style.display = 'block';
//     }
//     if (state.login == 'logged_in') {
//         login__form.style.display = 'none';
//         login__waiting.style.display = 'none';
//         return;
//     }
// }
