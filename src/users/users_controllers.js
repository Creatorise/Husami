const users_service = require('./users_service');

const get_all = async (req, res) => {
    const users = await users_service.get_all();
    res.status(200).send({ success: true, data: { users } });
};
const get_one = async (req, res) => {
    const { id } = req.params;
    const user = await users_service.get_one_by_id(id);
    if (!user) return res.status(404).send({ success: false });
    return res.status(200).send({ success: true, data: { user } });
};
const create_one = async (req, res) => {
    const { name, email, role } = req.body;
    const user = { name, email, role };
    const result = await users_service.create(user);
    if (!result.success) return res.status(422).send(result);
    return res.status(201).send(result);
};
const delete_one = async (req, res) => {
    const { id } = req.params;
    const was_deleted = await users_service.delete_one_by_id(id);
    if (!was_deleted) return res.status(404).send({ success: false });
    return res.status(200).send({ success: true });
};
module.exports = { get_all, get_one, create_one, delete_one };
