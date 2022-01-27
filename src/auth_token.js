const jwt = require('jsonwebtoken');

module.exports = {
    create,
};

function create(user_id) {
    const payload = { user_id };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '60s' });
    return token;
}
