const send_email = require('./send_email')

async function send_auth_email(email, auth_token) {
    const auth_link = `${process.env.BASE_URL}/api/auth/login/${auth_token}`
    console.log(`send_auth_email ~ auth_link`, auth_link)

    const email_content = {
        from: `"Husami" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Husami Authentication',
        html: `<a href="${auth_link}">${auth_link}</a>`,
    }
    await send_email(email_content)
}

module.exports = send_auth_email
