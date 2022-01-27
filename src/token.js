const jwt = require('jsonwebtoken');

const token = {
    create_auth_token,
    decode_auth_token,
};

module.exports = token;

function create_auth_token(user_id, auth_code) {
    const payload = { user_id, auth_code };
    const secret = process.env.JWT_SECRET;
    const auth_token = jwt.sign(payload, secret, {
        // expiresIn: '60s'
    });
    return auth_token;
}

function decode_auth_token(auth_token) {
    try {
        return jwt.decode(auth_token);
    } catch (error) {
        return null;
    }
}
