const { decode_auth_token } = require('../token');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    console.log(`admin ~ req.cookies`, req.cookies);
    const { auth_token } = req.cookies;

    const auth_token_payload = decode_auth_token(auth_token);
    console.log(`admin ~ auth_token_payload`, auth_token_payload);

    if (!auth_token_payload) {
        return res.send('Invalid auth token');
    }

    const is_admin = await req.db.users.has_role('admin', auth_token_payload.user_id);
    console.log(`admin ~ is_admin`, is_admin);

    if (!is_admin) {
        return res.send('No permissions');
    }
    next();
}
