const { verify_auth_token } = require('../utilities/token');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    const { auth_token } = req.cookies;
    const auth_token_payload = verify_auth_token(auth_token);
    if (!auth_token_payload) return res.send('Invalid auth token');

    if (auth_token_payload.user.role !== 'admin') return res.send('No access');
    next();
}
