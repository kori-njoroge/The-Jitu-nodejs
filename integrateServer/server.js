const express = require('express');
const app = express();
const sql = require('mssql');
const { config } = require('./sqlconfig');
const nodemailer = require('nodemailer');
const userRouter = require('./routes/userRoutes');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// home route
app.get('/', (req, res) => {
    res.send({message:"Welcome G"})
})

app.use('/users',userRouter)


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'standrewswomengroup@gmail.com',
        pass: 'edinqmqllshvowss'
        // user: 'korinjoroge63@gmail.com',
        // pass: 'kyfbyyavzjfjlmii'
    }
});

app.get('/sendmail', (req, res) => {
    console.log("send mail route")
    const mailOptions = {
        from: 'standrewswomengroup@gmail.com',
        to: `korinjoroge63@gmail.com`,
        subject: 'Registration!',
        text: `Hello,Kori 
        Your Registration was successful,
        welcome.
        Thank you `
    };
    // transporter.sendMail(mailOptions, function(error, info){
    //     console.log("we sending")
    //     if (error) {
    //         res.send(error)
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
});







const port = process.env.PORT || 5555;
app.listen(port, () => { console.log(`Server listening too port ${port}`) })