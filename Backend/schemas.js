// const Joi = require('joi'); 
// const schemas = { 
//   signUp: Joi.object().keys({ 
//     uname: Joi.string().min(3).required(), 
//     email: Joi.string().email().required(), 
//     password: Joi.string().min(3).max(15).required(),
//     mobileno: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()}), 
//   addProperty: { 
//     page: Joi.number().required(), 
//     pageSize: Joi.number().required() 
//   } 
// }; 
// module.exports = schemas;