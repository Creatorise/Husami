const generate_hex_code = require('../logic/generate_hex_code');

module.exports = {
    generate_auth_code,
};

async function generate_auth_code(req, res) {
    const { email } = req.body;
    // TODO: Validation of email

    res.end();

    const email_exists = await req.db.users.exists({ email });

    if (!email_exists) {
        return;
    }

    const auth_code = await generate_hex_code(3);
    console.log(`generate_code ~ code`, code);

    req.auth_code = auth_code;
    next();
}
