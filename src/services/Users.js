const model = require('../models/Users');

const registerUser = async (name, email, psw) => {
  const existingUser = await model.findByEmail(email);

  if (existingUser) {
    return {
      code: 409,
      message: 'Email already registered',
    };
  }

  const newUser = await model.registerUser(name, email, psw);
  const { password, ...userInfo } = newUser;

  return { user: userInfo };
};

module.exports = {
  registerUser,
};
