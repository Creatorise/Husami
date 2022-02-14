const houses_service = require('./houses_service');

const get_all = async (req, res) => {
    const houses = await houses_service.get_many();
    return res.status(200).send({ success: true, data: { houses } });
};
const get_one = async (req, res) => {
    const { id } = req.params;
    const house = await houses_service.get_one_by_id(id);
    if (!house) return res.status(400).send({ success: false });
    return res.status(200).send({ success: true, data: { house } });
};
const create_one = async (req, res) => {
    const { name, associates } = req.body;
    if (!name || !associates) {
        return res.status(400).send({ success: false });
    }
    const house = { name, associates };
    const id = await houses_service.create(house);
    return res.status(201).send({ success: true, data: { id } });
};
const delete_one = async (req, res) => {
    const { id } = req.params;
    const success = await houses_service.delete_one_by_id(id);
    if (!success) {
        return res.status(404).send({ success: false });
    }
    return res.status(200).send({ success: true });
};
module.exports = { get_all, get_one, create_one, delete_one };
