const { decode_auth_token } = require('../token');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    console.log(`admin ~ req.cookies`, req.cookies);
    const { auth_token } = req.cookies;

    const auth_token_payload = decode_auth_token(auth_token);

    if (!auth_token_payload) {
        return res.send('Invalid auth token');
    }

    const is_admin = await req.db.users.has_role('admin', auth_token_payload.user_id);

    if (!is_admin) {
        return res.send('No permissions');
    }
    next();
}
