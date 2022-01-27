const generate_hex_code = require('../generate_hex_code');
const send_email = require('../send_email');

module.exports = {
    generate_auth_code,
    send_auth_email,
};

async function generate_auth_code(req, res, next) {
    const { email } = req.body;
    // TODO: Validation of email

    res.end();

    const email_exists = await req.db.users.exists({ email });

    if (!email_exists) {
        return;
    }

    const auth_code = await generate_hex_code(3);
    console.log(`generate_auth_code ~ auth_code`, auth_code);

    req.auth_code = auth_code;
    next();
}

async function send_auth_email(req, _) {
    const email = {
        from: '"Husami" <noreply@creatorise.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        // text: 'Hello world?', // plain text body
        html: `<b>${req.auth_code}</b>`, // html body
    };
    console.log(`send_auth_email ~ email`, email);
    await send_email(email);
}
