module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};

async function index(req, res) {
    const users = await req.db.users.index();

    return res.send(users);
}

async function show(req, res) {
    const { id } = req.params;

    const user = await req.db.users.show(id);

    return res.send(user);
}

async function store(req, res) {
    const { name, email } = req.body;
    // TODO: Validation

    const was_success = await req.db.users.store(name, email);

    return res.send({ success: was_success });
}

async function update(req, res) {
    return res.send('Not yet impemented');
}

async function destroy(req, res) {
    const { id } = req.params;

    const was_success = await req.db.users.destroy(id);

    return res.send({ success: was_success });
}
