const generate_hex_code = require('../generate_hex_code');
const { create_auth_token, decode_auth_token } = require('../token');
const send_email = require('../send_email');

module.exports = {
    send_auth_link,
    authenticate,
    logout,
};

const EventEmitter = require('events');
const auth_emitter = new EventEmitter();

async function send_auth_link(req, res) {
    const { email } = req.body;
    // TODO: email validation

    const user = await req.db.users.get_user({ email });
    if (!user) {
        return;
    }

    const auth_code = await generate_hex_code(3);
    const auth_token = create_auth_token(user._id, auth_code);
    // console.log(`send_auth_link ~ auth_token`, auth_token);

    send_auth_email(email, auth_token);

    auth_emitter.once('continue', auth_token => {
        res.cookie('auth_token', auth_token);
        res.send('The auth token has been stored as browser cookie');
    });
}

async function send_auth_email(email, auth_token) {
    const auth_link = `${process.env.BASE_URI}/api/login/${auth_token}`;
    console.log(`send_auth_email ~ auth_link`, auth_link);

    const email_object = {
        from: `"Husami" <${process.env.EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        // text: 'Hello world?', // plain text body
        html: `<a href="${auth_link}">${auth_link}</a>`, // html body
    };
    // console.log(`send_auth_email ~ email_object`, email_object);
    await send_email(email_object);
}

async function authenticate(req, res) {
    //! security issue, should make use of req params

    const { auth_token } = req.params;

    auth_token_payload = decode_auth_token(auth_token);

    if (!auth_token_payload) {
        return res.send('invalid auth token');
    }

    auth_emitter.emit('continue', auth_token);

    res.cookie('auth_token', auth_token);
    res.send('The auth token has been stored as browser cookie');

    // const token = auth_token.create(user_id);
    // res.send({ token });
    // res.send('Auth close event emitted');
    // res.redirect(`/api/auth/${user_id}/${auth_code}`);
}

function logout(req, res) {
    res.clearCookie('auth_token');
    res.send('The auth token has been removed');
}
