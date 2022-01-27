const nodemailer = require('nodemailer');

module.exports = send_email;

async function send_email(email_object) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'ns2.inleed.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail(email_object);

    console.log('Message sent:', info.messageId);
    console.log('Message sent:', info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
