const User = require('./users_model')

async function create_user(req, res) {
    const result = await User.create(req.body)
    console.log(`create_user ~ result`, result)

    return res.status(202).end()
}

module.exports = { create_user }
