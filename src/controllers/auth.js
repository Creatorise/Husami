const generate_hex_code = require('../generate_hex_code');
const send_email = require('../send_email');

module.exports = {
    send_auth_code,
    login,
};

const EventEmitter = require('events');
const waiter = new EventEmitter();

async function send_auth_code(req, res) {
    console.log(`generate_auth_code ~ generate_auth_code`);
    const { email } = req.body;
    // TODO: Validation of email

    waiter.once('finish', (user_id, auth_code) => {
        console.log(`waiter.on ~ user_id`, user_id);
        console.log(`waiter.on ~ auth_code`, auth_code);
        res.send('finished');
        // res.redirect(`/api/auth/${user_id}/${auth_code}`);
    });

    // res.end();

    const email_exists = await req.db.users.exists({ email });

    if (!email_exists) {
        return;
    }

    const auth_code = await generate_hex_code(3);

    send_auth_email(email, auth_code);

    return;
}

async function send_auth_email(email, auth_code) {
    const email_object = {
        from: `"Husami" <${process.env.EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        // text: 'Hello world?', // plain text body
        html: `<b>${auth_code}</b>`, // html body
    };
    console.log(`send_auth_email ~ email_object`, email_object);
    await send_email(email_object);
}

async function login(req, res) {
    const { user_id, auth_code } = req.params;

    waiter.emit('finish', user_id, auth_code);
    res.send('check if finished');
    // res.redirect(`/api/auth/${user_id}/${auth_code}`);
}
