const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET;


module.exports = {
    createToken: async (data) => {
        try {
            let token = jwt.sign(data, secret, ({ expiresIn: '5s' }))
            return token
        } catch (error) {
            console.log(error)
        }
    },
    validateToken:(token)=>{

    }
}