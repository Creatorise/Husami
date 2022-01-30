const User = require('./users_model')

async function create_user(req, res) {
    User.create(req.body)

    return res.status(202).end()
}

module.exports = { create_user }
