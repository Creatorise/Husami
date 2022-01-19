module.exports = {
    get_all_users,
    get_one_user,
};

async function get_all_users(req, res) {
    const users = await req.db.get_all_users();

    return res.send(users);
}

async function get_one_user(req, res) {
    const { name } = req.params;

    const user = await req.db.get_one_user(name);

    return res.send(user);
}
