const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


module.exports = {
    createToken: async (data) => {
        try {
            let token = jwt.sign(data, secret, ({ expiresIn: '25s' }))
            return token
        } catch (error) {
            console.log(error)
        }
    },
    validateToken: (token) => {
        try {
            let data = jwt.verify(token, secret)
            return data
        } catch (error) {
            return (error.message)
        }
    }
}