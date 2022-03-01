const tasks_service = require('./tasks_service');

const create = async (req, res) => {
    const { heading } = req.body;
    if (!heading) {
        res.status(400).send({
            success: false,
            message: 'Cannot create a task without a heading',
        });
    }
    const task = { heading };
    const database_response = await tasks_service.create(task);
    if (!database_response) {
        res.status(400).send({
            status: false,
            message: 'Unable to create task',
        });
    }
    res.end();
};

module.exports = { create };
