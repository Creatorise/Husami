module.exports = {
    get_all_users,
    get_one_user,
    create_user,
};

async function get_all_users(req, res) {
    const users = await req.db.get_all_users();

    return res.send(users);
}

async function get_one_user(req, res) {
    const { name } = req.params;

    const user = await req.db.get_one_user({ name });

    return res.send(user);
}

async function create_user(req, res) {
    const { name, email, password } = req.body;
    // TODO: Validation

    const was_success = await req.db.create_user(name, email, password);

    res.send({ success: was_success });
}
