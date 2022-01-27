const { ObjectId } = require('mongodb');

module.exports = users;

function users(users_collection) {
    return {
        index,
        show,
        store,
        destroy,
        exists,
    };

    // TODO: Add error handling in database functions

    async function index() {
        const users = await users_collection.find().toArray();
        return users;
    }

    async function show(id) {
        const user = await users_collection.findOne({ _id: ObjectId(id) });
        return user;
    }

    async function store(name, email) {
        const user = { name, email };
        // console.log(`store ~ user`, user);
        // console.log(`store ~ show({ email })`);

        if (await exists({ email })) {
            return false;
        }
        const response = await users_collection.insertOne(user);
        // console.log(`store ~ response`, response);

        return true;
    }

    async function destroy(id) {
        const { deletedCount } = await users_collection.deleteOne({ _id: ObjectId(id) });

        if (deletedCount === 0) {
            return false;
        }
        return true;
    }

    async function exists(query) {
        const user = await users_collection.findOne(query);
        return !!user;
    }
}
