const { verify_auth_token } = require('./auth_token');

function auth(...access_roles) {
    return (req, res, next) => {
        const { id } = req.params;
        console.log(`return ~ id`, id);
        const { auth_token } = req.cookies;
        const auth_token_payload = verify_auth_token(auth_token);
        if (!auth_token_payload) {
            return res
                .status(401)
                .send({ success: false, message: 'Invalid auth token' });
        }
        const authorized = access_roles.some(access_role =>
            access_role(auth_token_payload.user, id)
        );
        if (!authorized) {
            return res
                .status(401)
                .send({ success: false, message: 'User not authorized' });
        }
        next();
    };
}
const access = {
    admin: user => user.role === 'admin',
    current_user: (user, param_id) => user.id === param_id,
};

module.exports = { auth, access };
