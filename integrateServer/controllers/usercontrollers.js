const sql = require('mssql');
const { config } = require('../sqlconfig');
const { createToken, validateToken } = require('../services/jwtServices')
const { getUser } = require('../services/getUserService');
const { sendMail } = require('../services/nodemailerServices');

module.exports = {
    // adding a user
    addUser: async (req, res) => {
        let { firstname, password, gender } = req.body;
        await sql.connect(config);
        let result = await sql.query`INSERT INTO dbo.myusers VALUES (${firstname},${password},${gender})`;
        result = result.rowsAffected
        if (result) res.status(200).json({ message: "User succesfully added!" })
    },
    // login user
    loginUser: async (req, res) => {
        const { id, password } = req.body
        let user = await getUser(id)
        if (user === "User not found") res.json({ message: user })
        if (user.password === password) {
            let token = await createToken({ userid: user.id })
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
    validateTokenController: async (req, res) => {
        let token = req.headers['authorization'];
        token = token.split(" ")[1]
        res.json({ resres: validateToken(token) })
        console.log(validateToken(token))
    },


    sendEmail: async (req, res) => {
        let message = `Hello,Kori 
        Your Registration was successful,
        welcome.
        Thank you `
        let recipient = 'korijunior106@gmail.com'
        console.log("send mail route")
        res.json({ message: await sendMail(message, recipient) });
    }
}