module.exports = {
    get_all_users,
};

async function get_all_users(req, res) {
    const user_collection = await require('../database')();

    const users = await user_collection.get_all_users();

    res.send(users);
}
