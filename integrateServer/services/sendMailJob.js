const cron = require('node-cron');
const { sendMail } = require('./nodemailerServices');


function scheduleSendMail( message ,recipient){
    cron.schedule(`30 9 * * *`,()=>{
        console.log('sending mail soon')
        sendMail(message,recipient)
    })
}

module.exports =  scheduleSendMail;