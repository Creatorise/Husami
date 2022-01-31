// const houses = require('./houses_service')

async function create_house(req, res) {
    res.status(400).send({ success: false });
    // const { name, email, role } = req.body
    // const house = { name, email, role }
    // const result = await house.create(house)
    // if (!result.success) return res.status(422).send(result)
    // return res.status(201).end()
}
module.exports = { create_house };
