const nodemailer = require('nodemailer');

module.exports = authenticate_login;

async function authenticate_login(req, res) {
    const { email } = req.body;
    console.log(`authenticate_login ~ email`, email);

    const user = await req.db.get_one_user({ email });
    console.log(`authenticate_login ~ user`, user);

    send_email(user.email);
    // send_email('davlin@creatorise.com');

    res.send('email sent');
}

async function send_email(email) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'ns2.inleed.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'noreply@creatorise.com',
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Husami" <noreply@creatorise.com>', // sender address
        to: email, // list of receivers
        subject: 'Husami Authentication', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello, World!</b>', // html body
    });

    console.log('Message sent:', info.messageId);
    console.log('Message sent:', info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
