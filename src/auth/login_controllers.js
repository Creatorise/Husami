const users_service = require('../users/users_model')
const { create_auth_token, verify_auth_token } = require('./auth_token')
const send_auth_email = require('./send_auth_email')
const EventEmitter = require('events')
const auth_emitter = new EventEmitter()

async function send_auth_link(req, res) {
    const { email } = req.body
    // TODO: email validation

    const user = await users_service.get_one({ email })
    if (!user) {
        return
        // Idea: if email not currently a user,
        // send email asking if wanting to become a user
    }
    const auth_token_to_send = create_auth_token(user)
    send_auth_email(email, auth_token_to_send)

    auth_emitter.once(user._id.toString(), auth_token => {
        res.cookie('auth_token', auth_token)
        res.send('The auth token has been stored as browser cookie')
    })
}

// TODO: it should be a new access token used for further authentication, not the same one
// The first one expiring fast and the second with a later expire date
async function authenticate_link(req, res) {
    const { auth_token } = req.params
    auth_token_payload = verify_auth_token(auth_token)
    if (!auth_token_payload) {
        return res.send('invalid auth token')
    }
    auth_emitter.emit(auth_token_payload.user.id.toString(), auth_token)
    res.cookie('auth_token', auth_token)
    res.send('The auth token has been stored as browser cookie')
}

function remove_auth_cookie(req, res) {
    res.clearCookie('auth_token')
    res.send('The auth cookie is removed')
}

module.exports = {
    send_auth_link,
    authenticate_link,
    remove_auth_cookie,
}
