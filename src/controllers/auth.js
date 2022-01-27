const crypto = require('crypto');
const { promisify } = require('util');
const crypto_random_bytes = promisify(crypto.randomBytes);

module.exports = {
    generate_code,
};

async function generate_code(req, res) {
    const { email } = req.body;
    console.log(`generate_code ~ email`, email);
    // TODO: Validation of email

    const email_exists = await req.db.users.exists({ email });
    console.log(`generate_code ~ email_exists`, email_exists);

    if (!email_exists) {
        return res.end();
    }

    const buffer = await crypto_random_bytes(3);
    const code = buffer.toString('hex');
    console.log(`generate_code ~ code`, code);

    // const was_success = await req.db.users.store(name, email);

    // return res.send({ success: was_success });
}
