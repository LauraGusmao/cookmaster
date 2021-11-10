const connection = require('./connection');

const registerUser = async (name, email, password) => {
  const newUser = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role: 'user' }))
    .then((result) => result.ops[0]);
  
  return newUser;
};

const findByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  
  if (!user) return null;

  return user;
};

module.exports = {
  registerUser,
  findByEmail,
};
