const jwt = require('jsonwebtoken');

const auth = { admin };
module.exports = auth;

async function admin(req, res, next) {
    const { token } = req.body;

    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET);
        console.log(`check_admin_rights ~ payload`, payload);

        const is_admin = await req.db.users.has_role('admin', payload.user_id);

        if (!is_admin) {
            return res.send('no permission');
        }
        next();
    } catch (error) {
        console.log(`admin ~ error`, error);
        return res.send('Invalid token');
    }
}
