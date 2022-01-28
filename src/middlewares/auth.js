const { verify_auth_token } = require('../utilities/token');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    const { auth_token } = req.cookies;

    const auth_token_payload = await verify_auth_token(auth_token);

    if (!auth_token_payload) {
        return res.send('Invalid auth token');
    }

    const is_admin = await req.db.user_has_role(auth_token_payload.user_id, 'admin');

    if (!is_admin) {
        return res.send('No permissions');
    }
    next();
}
