const houses = require('./houses_service');

async function create_house(req, res) {
    const { name, associates } = req.body;
    if (!name || !associates) {
        return res.status(400).send({ success: false });
    }
    const house = { name, associates };
    const result = await houses.create(house);
    return res.status(201).send({ success: true });
}
module.exports = { create_house };
