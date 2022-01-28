module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

async function index(req, res) {
    const users = await req.db.get_all_users();

    return res.send(users);
}

async function show(req, res) {
    const { id } = req.params;

    const user = await req.db.get_user({ id });

    return res.send(user);
}

async function store(req, res) {
    const { name, email, role } = req.body;
    // TODO: Validation

    const was_success = await req.db.create_user({ name, email, role });

    return res.send({ success: was_success });
}

async function update(req, res) {
    return res.send('Not yet impemented');
}

async function destroy(req, res) {
    const { id } = req.params;

    const was_success = await req.db.delete_user(id);

    return res.send({ success: was_success });
}
