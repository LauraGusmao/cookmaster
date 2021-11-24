const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('User login', () => {
  let connectionMock;

  describe('When user is not registered', () => {
    let response = {};

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'lauragus@email.com',
          password: 'abc123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retuns status code 401', (done) => {
      expect(response).to.have.status(401);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns message "User does not exist or invalid password"', (done) => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
      done();
    });
  });

  describe('When it has an empty field', () => {
    let response = {};

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'Laura Gusmao',
        email: 'myemail@cookmaster.com',
        password: 'abc123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'myemail@cookmaster.com',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retuns status code 401', (done) => {
      expect(response).to.have.status(401);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns message "All fields must be filled"', (done) => {
      expect(response.body.message).to.be.equal('All fields must be filled');
      done();
    });
  });

  describe('When user is successfully logged in', () => {
    let response = {};

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'Laura Gusmao',
        email: 'myemail@cookmaster.com',
        password: 'abc123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/login')
        .send({
          email: 'myemail@cookmaster.com',
          password: 'abc123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retuns status code 200', (done) => {
      expect(response).to.have.status(200);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns "token" property', (done) => {
      expect(response.body).to.have.property('token');
      done();
    });
  });
});