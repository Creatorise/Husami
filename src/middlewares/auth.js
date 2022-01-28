const { verify_auth_token } = require('../utilities/token');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    const { auth_token } = req.cookies;

    const { user } = verify_auth_token(auth_token);

    if (!user) {
        return res.send('Invalid auth token');
    }

    // const is_admin = await req.db.user_has_role(user.user_id, 'admin');

    if (user.role !== 'admin') {
        return res.send('No permissions');
    }
    next();
}
