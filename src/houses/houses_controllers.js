const houses_service = require('./houses_service');

async function create_house(req, res) {
    const { name, associates } = req.body;
    if (!name || !associates) {
        return res.status(400).send({ success: false });
    }
    const house = { name, associates };
    const id = await houses_service.create(house);
    console.log(`create_house ~ id`, id);
    return res.status(201).send({ success: true, data: { id } });
}
async function get_houses(req, res) {
    const houses = await houses_service.get_many();
    return res.status(200).send({ success: true, data: { houses } });
}
async function get_house(req, res) {
    const { id } = req.params;
    const house = await houses_service.get_one_by_id(id);
    return res.status(200).send({ success: true, data: { house } });
}
async function delete_house(req, res) {
    const { id } = req.params;
    const success = await houses_service.delete_one_by_id(id);
    if (!success) {
        return res.status(404).send({ success: false });
    }
    return res.status(200).send({ success: true });
}

module.exports = { create_house, get_houses, get_house, delete_house };
