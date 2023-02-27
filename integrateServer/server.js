const express = require('express');
const app = express();

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
    res.json(users)
})

// adding a user
app.post('/users', (req, res) => {
    let newUser = req.body;
    users.push(newUser);
    res.json(users)

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
        }else{
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

const port = 5500;
app.listen(port, () => { console.log(`Server listening too port ${port}`) })