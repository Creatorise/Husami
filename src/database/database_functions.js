const { ObjectId } = require('mongodb');

module.exports = database_functions;

function database_functions(users_collection, houses_collection) {
    return {
        get_all_users,
        get_user,
        get_user_by_email,
        create_user,
        delete_user,
        user_has_role,
        get_houses,
        create_house,
    };

    // TODO: Add error handling in database functions

    async function get_all_users(query) {
        const users = await users_collection.find(query).toArray();
        return users;
    }

    async function get_user(id) {
        const user = await users_collection.findOne({ _id: ObjectId(id) });
        return user;
    }

    async function get_user_by_email(email) {
        const user = await users_collection.findOne({ email });
        return user;
    }

    async function create_user(new_user) {
        const earlier_user = await get_user_by_email(new_user.email);

        if (earlier_user) {
            return false;
        }
        await users_collection.insertOne(new_user);

        return true;
    }

    async function delete_user(id) {
        const { deletedCount } = await users_collection.deleteOne({ _id: ObjectId(id) });

        if (deletedCount === 0) {
            return false;
        }
        return true;
    }

    async function user_has_role(id, role) {
        const user = await get_user(id);

        if (user?.role === role) return true;
        return false;
    }

    async function get_houses(query) {
        const houses = await houses_collection.find(query).toArray();
        return houses;
    }

    async function create_house(house) {
        await houses_collection.insertOne(house);

        return true;
    }
}
