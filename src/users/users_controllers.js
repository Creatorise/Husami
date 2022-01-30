const User = require('./users_model')

async function create_user(req, res) {
    const result = await User.create(req.body)
    if (!result.success) return res.status(422).send(result)
    return res.status(202).send(result)
}
async function get_user(req, res) {
    const { id } = req.params
    const user = await User.get_one_by_id(id)
    if (!user) return res.status(404).end()
    return res.status(200).send()
}
async function get_users(req, res) {
    const users = await User.get_all()
    res.status(200).send({ success: true, data: { users } })
}

module.exports = { get_users, get_user, create_user }
