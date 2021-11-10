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

const login = async (email, password) => {
  if (!email || !password) {
    return {
      code: 401,
      message: 'All fields must be filled',
    };
  }

  const user = await model.findByEmail(email);

  if (!user || user.password !== password) {
    return {
      code: 401,
      message: 'Incorrect username or password',
    };
  }

  return { user };
};

module.exports = {
  registerUser,
  login,
};
