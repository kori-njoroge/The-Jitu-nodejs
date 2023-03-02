const sql = require('mssql');
const {config} = require('../sqlconfig');

module.exports = {
    getAllUsers: async (req, res) => {
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
    },
    // adding a user
    addUser: async (req, res) => {
        let newUser = req.body;
        users.push(newUser);
    },
    // getting single user
    getSingleUser: async (req, res) => {
        const { id } = req.params;
        const user = users.find(user => user.id === Number(id));
    },

    // updating user info.
    updateUserInfo: (req, res) => {
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
    },
    loginUser: async (req, res) => {
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
    },
    // delete a user.
    deleteUser: async (req, res) => {
        let { id } = req.body;
        let newUsers = users.filter(user => user.id !== Number(id))
        res.json(newUsers);
    }

}