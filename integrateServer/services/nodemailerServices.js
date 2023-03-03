const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    },
})

module.exports = {
    sendMail: async (message, recipient) => {
        const mailOptions = {
            from: 'korinjoroge63@gmail.com',
            to: recipient,
            subject: 'Hello there',
            text: message,
            html: ''
        }
        let response = await transporter.sendMail(mailOptions)
        console.log("my res", response)
        return response.response
    }
}