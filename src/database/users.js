const { ObjectId } = require('mongodb');

module.exports = users;

function users(users_collection) {
    return {
        index,
        show,
        store,
        destroy,
        exists,
        get_user,
        has_role,
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

    async function store(user) {
        if (await exists({ email: user.email })) {
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

    async function get_user(query) {
        const user = await users_collection.findOne(query);
        return user;
    }

    async function has_role(role, id) {
        const user = await users_collection.findOne({ _id: ObjectId(id) });
        console.log(`has_role ~ user`, user);

        if (role === user.role) return true;
        return false;
    }
}
