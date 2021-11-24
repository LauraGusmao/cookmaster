# Cookmaster

Bem vindo(a) ao projeto Cookmaster.

Este projeto foi desenvolvido durante o curso de Desenvolvimento Web na Trybe, no módulo de Back-end.

Repositório original com requisitos do projeto: https://github.com/tryber/sd-011-cookmaster.

## Sobre

Neste projeto foi desenvolvida uma API REST com arquitetura MSC (Models, Service e Controllers) onde o usuário é capaz de realizar operações de Criação, Leitura, Atualização e Exclusão (CRUD) de receitas em determinado banco de dados.

Para realizar qualquer tipo de alteração no banco de dados é necessário autenticar-se. Além disso, as pessoas usuárias podem ser clientes ou administradores. Pessoas clientes podem apenas disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

Além disso, é possível adicionar uma imagem à receita, fazendo o upload de arquivo.

## Tecnologias

Foram utiliazadas as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Express Rescue](https://github.com/rwillians/express-rescue)
- [MongoDB](https://www.mongodb.com/)
- [Joi](https://joi.dev/)
- [JSON Web Token](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)
- [Nodemon](https://github.com/remy/nodemon)

## Instalação

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/), [Node.js](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/). Além disto é bom ter um editor para trabalhar com o código.

### Rodando a aplicação

```bash
# Clone este repositório
$ git clone git@github.com:LauraGusmao/cookmaster.git

# Acesse a pasta do projeto no terminal
$ cd cookmaster

# Instale as dependências
$ npm install

#Execute a aplicação
$ npm start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000/
```
