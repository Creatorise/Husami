const database = require('../services/database');
const houses_service = require('../houses/houses_service');

// const get_many = async (house_id, query) => {
//     const house = await houses_service.get_one_by_id(house_id);
//     const response = await house.tasks.find(query);
//     const tasks = response.toArray();
//     return tasks;
// };
const create = async (task, house_id) => {
    const house = await houses_service.get_one_by_id(house_id);
    console.log(`create ~ house`, house);
    return database.houses.insertOne(task);
};
module.exports = {
    create,
};
