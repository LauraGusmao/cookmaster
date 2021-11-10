const express = require('express');

const usersRouter = require('../routes/Users');
const handleError = require('../middlewares/handleError');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', usersRouter);

app.use(handleError);

module.exports = app;
