const express = require('express');
const app = express();
const sql = require('mssql');
const { config } = require('./sqlconfig');
const nodemailer = require('nodemailer')

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = [
    {
        firstName: 'Gideon',
        lastName: 'Kori',
        gender: 'male',
        password: 'pass123',
        country: 'Kenya',
        age: 22,
        id: 1
    },
    {
        firstName: 'Summer',
        lastName: 'Sumsum',
        gender: 'female',
        password: 'pass123',
        country: 'Gabon',
        age: 20,
        id: 2
    },
    {
        firstName: 'Rick',
        lastName: 'Sanchez',
        gender: 'male',
        password: 'pass123',
        country: 'Gambia',
        age: 25,
        id: 3
    },
    {
        firstName: 'Morty',
        lastName: 'Smith',
        gender: 'male',
        password: 'pass123',
        country: 'Madagascar',
        age: 18,
        id: 4
    },
    {
        firstName: 'Beth',
        lastName: 'Smith',
        gender: 'female',
        password: 'pass123',
        country: 'Tokyo',
        age: 32,
        id: 5
    },
]

// home route
app.get('/', (req, res) => {
    res.send({message:"Welcome G"})
})

app.get('/users', async (req, res) => {
    try {
        console.log('-----------connectiiing-----------')
        await sql.connect(config)
        console.log("-----------connected--------------")
        let users = await sql.query`SELECT * FROM dbo.myusers`
        res.json(users.recordset)
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})
// adding a user
app.post('/users', (req, res) => {
    let newUser = req.body;
    users.push(newUser);

})


// getting single user
app.get('/users:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === Number(id));
});


// updating user info.
app.put('/users', (req, res) => {
    const user_det = req.body;
    users.map(user => {
        if (user.id === user_det.id) {
            user.firstName = user_det.firstName
            user.lastName = user_det.lastName
            user.gender = user_det.gender
        } else {
            user
        }
    })
})

// login
// app.get('/userslogin', (req, res) => {
//     console.log('first')
// res.send(
// ` <form>
//         <label for ='name'>firstName</label>
//         <input type='text' id='name' placeholder ='first name'></input>
//     </form>`
// )
// })


app.post('/userslogin', (req, res) => {
    const id = req.body.id
    const userName = req.body.firstName;
    const passPass = req.body.password;


    users.map(user => {
        if (user.id === Number(id)) {
            if (user.firstName === userName && user.password === passPass) {
                res.send('True');
            } else {
                res.send('False');
            }
        } else {
            res.send('User does not exist');
        }
    })
})


// delete a user.
app.delete('users:id', (req, res) => {
    let { id } = req.body;
    let newUsers = users.filter(user => user.id !== Number(id))
    res.json(newUsers);
})


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