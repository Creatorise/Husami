const houses_service = require('../houses/houses_service');
const tasks_service = require('./tasks_service');

const create = async (req, res) => {
    const { id: house_id } = req.params;
    console.log(`create ~ house_id`, house_id);

    const house = await houses_service.get_one_by_id(house_id);
    console.log(`create ~ house`, house);

    house.tasks.insertOne({ name: 'hi' });

    return res.end();
    // const { heading } = req.body;
    // console.log(`create ~ id`, id);
    // if (!heading) {
    //     return res.status(400).send({
    //         success: false,
    //         message: 'Cannot create a task without a heading',
    //     });
    // }
    // const task = { heading };
    // const database_response = await tasks_service.create(task);
    // const id = database_response.insertedId;
    // return res.status(201).send({
    //     status: true,
    //     message: 'Task created',
    //     data: { id },
    // });
};

module.exports = { create };
