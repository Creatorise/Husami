module.exports = {
    index,
};

async function index(req, res) {
    const houses = await req.db.get_houses({ owner: req.user.id });
    return res.send(houses);
}
