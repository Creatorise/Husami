const auth = {
    admin,
};

module.exports = auth;

function admin(req, res, next) {
    next();
}
