const sql = require('mssql');
const { config } = require('../sqlconfig');
const { createToken, validateToken } = require('../services/jwtServices')
const { getUser } = require('../services/getUserService')

module.exports = {
    // adding a user
    addUser: async (req, res) => {
        let newUser = req.body;
        users.push(newUser);
    },
    // login user
    loginUser: async (req, res) => {
        const { id, firstName, password } = req.body
        let user = await getUser(id)
        if (user === "User not found") res.json({ message: user })
        if (user.password === password) {
            let token = await createToken({ userid: user.id, first_name: user.firstName })
            res.status(200).json({ message: "Login successful", token })
        }
        else res.json({ message: "Check credentials" })
    },
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

    // getting single user
    getSingleUser: async (req, res) => {
        const { id } = req.params;
        const user = user.find(user => user.id === Number(id));
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
    // delete a user.
    deleteUser: async (req, res) => {
        let { id } = req.body;
        let newUsers = users.filter(user => user.id !== Number(id))
        res.json(newUsers);
    },
    validateToken:async(token)

}