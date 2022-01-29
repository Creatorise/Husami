module.exports = {
    index,
    store,
};

async function index(req, res) {
    const houses = await req.db.get_houses(/* { owner: req.user.id } */);
    return res.send(houses);
}

async function store(req, res) {
    const { name, description } = req.body;
    console.log(`store ~ name`, name);

    const was_success = await req.db.create_house({
        name,
        description,
        owner: req.user.id,
    });

    return res.send({ success: was_success });
}
