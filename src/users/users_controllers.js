const User = require('./users_model')

async function create_user(req, res) {
    const result = await User.create(req.body)
    if (!result.success) return res.status(422).send(result)
    return res.status(202).send(result)
}

async function get_users(req, res) {
    const users = await User.get_all()
    res.status(200).send({ success: true, data: { users } })
}

module.exports = { get_users, create_user }
