const generate_hex_code = require('../utilities/generate_hex_code');
const { create_auth_token, verify_auth_token } = require('../utilities/token');
const send_auth_email = require('../utilities/send_auth_email');

module.exports = {
    send_auth_link,
    authenticate_link,
    remove_auth_cookie,
};

const EventEmitter = require('events');
const auth_emitter = new EventEmitter();

async function send_auth_link(req, res) {
    const { email } = req.body;
    // TODO: email validation

    const user = await req.db.get_user_by_email(email);
    if (!user) {
        return;
    }

    const auth_code = await generate_hex_code(3);
    const auth_token = create_auth_token(user._id, auth_code);

    send_auth_email(email, auth_token);

    auth_emitter.once(user._id.toString(), auth_token => {
        res.cookie('auth_token', auth_token);
        res.send('The auth token has been stored as browser cookie');
    });
}

async function authenticate_link(req, res) {
    const { auth_token } = req.params;
    auth_token_payload = await verify_auth_token(auth_token);
    console.log(
        `authenticate_link ~ auth_token_payload.user_id`,
        auth_token_payload.user_id
    );
    // console.log(`authenticate_link ~ auth_token_payload`, auth_token_payload);

    if (!auth_token_payload) {
        return res.send('invalid auth token');
    }

    auth_emitter.emit(auth_token_payload.user_id.toString(), auth_token);

    res.cookie('auth_token', auth_token);
    res.send('The auth token has been stored as browser cookie');
}

function remove_auth_cookie(req, res) {
    res.clearCookie('auth_token');
    res.send('The auth cookie is removed');
}
