
const Joi = require('joi')

const signUpschema = Joi.object({
    firstname: Joi.string()
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z1-9]{5,30}'))
        .required(),
    confirmpassword: Joi.ref("password"),
    gender: Joi.string().min(4).max(10),
    phonenumber: Joi.number().min(10),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: ['*'] })
}).with("password", "confirmpassword") //they all must be present for comparison
    .xor("phonenumber", "email") //either of the two must be present

const validateSchema = (payload) => {
    return signUpschema.validate(payload, { abortEarly: false })
}

module.exports = validateSchema