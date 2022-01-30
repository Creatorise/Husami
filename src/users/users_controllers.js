const User = require('./users_model')

async function create_user(req, res) {
    const result = await User.create(req.body)

    return res.status(202).send(result)
}

module.exports = { create_user }
