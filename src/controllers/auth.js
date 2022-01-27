const generate_hex_code = require('../generate_hex_code');
const send_email = require('../send_email');

module.exports = {
    generate_auth_code,
    send_auth_email,
    login,
};

const EventEmitter = require('events');
const waiter = new EventEmitter();

async function generate_auth_code(req, res, next) {
    console.log(`generate_auth_code ~ generate_auth_code`);
    const { email } = req.body;
    // TODO: Validation of email

    waiter.on('finish', () => {
        res.send('finished');
    });

    // res.end();

    const email_exists = await req.db.users.exists({ email });
    console.log(`generate_auth_code ~ email_exists`, email_exists);

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
        from: `"Husami" <${process.env.EMAIL}>`, // sender address
        to: req.body.email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        // text: 'Hello world?', // plain text body
        html: `<b>${req.auth_code}</b>`, // html body
    };
    console.log(`send_auth_email ~ email`, email);
    await send_email(email);
}

async function login(req, res) {
    waiter.emit('finish');

    res.send('check if finished');
}
