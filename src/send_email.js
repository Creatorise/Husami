const nodemailer = require('nodemailer');

module.exports = send_email;

async function send_email(email_content) {
    let transporter = nodemailer.createTransport({
        host: 'ns2.inleed.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail(email_content);
    // console.log('Message sent:', info);
}
