const generate_hex_code = require('../generate_hex_code');
const send_email = require('../send_email');

module.exports = {
    send_auth_code,
    login,
};

const EventEmitter = require('events');
const auth_emitter = new EventEmitter();

async function send_auth_code(req, res) {
    const { email } = req.body;
    // TODO: Validation of email

    const user = await req.db.users.get_user({ email });
    if (!user) {
        return;
    }

    const auth_code = await generate_hex_code(3);
    send_auth_email(email, user._id, auth_code);

    auth_emitter.once('close', (user_id, auth_code) => {
        // console.log(`auth_emitter.once ~ user_id`, user_id);
        // console.log(`auth_emitter.once ~ auth_code`, auth_code);

        res.send('Auth close event triggered');
    });
}

async function send_auth_email(email, user_id, auth_code) {
    const auth_link = `${process.env.BASE_URI}/api/auth/${user_id}/${auth_code}`;
    console.log(`send_auth_email ~ auth_link`, auth_link);

    const email_object = {
        from: `"Husami" <${process.env.EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        // text: 'Hello world?', // plain text body
        html: `<a href="${auth_link}">${auth_link}</a>`, // html body
    };
    // console.log(`send_auth_email ~ email_object`, email_object);
    await send_email(email_object);
}

async function login(req, res) {
    const { user_id, auth_code } = req.params;

    auth_emitter.emit('close', user_id, auth_code);
    res.send('Auth close event emitted');
    // res.redirect(`/api/auth/${user_id}/${auth_code}`);
}
