const joi = require("joi");

module.exports = (user) => {
  const createUserSchema = joi
    .object({
      username: joi.string().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    })
    .options({ abortEarly: true });
  return createUserSchema.validate(user);
};