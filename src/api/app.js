const express = require('express');

const usersRouter = require('../routes/Users');
const recipesRouter = require('../routes/Recipes');
const handleError = require('../middlewares/handleError');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(`${__dirname}/../uploads`));
app.use(handleError);

module.exports = app;
