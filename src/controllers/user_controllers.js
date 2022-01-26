module.exports = {
    get_all_users,
    get_user,
    create_user,
    delete_user,
};

async function get_all_users(req, res) {
    const users = await req.db.get_users(null);

    return res.send(users);
}

async function get_user(req, res) {
    const { email } = req.body;

    const { name } = await req.db.get_user({ email });

    return res.send({ name });
}

async function create_user(req, res) {
    const { name, email } = req.body;
    // TODO: Validation

    const was_success = await req.db.create_user(name, email);

    res.send({ success: was_success });
}

async function delete_user(req, res) {
    const { email } = req.body;

    const was_success = await req.db.delete_user(email);

    res.send({ success: was_success });
}
