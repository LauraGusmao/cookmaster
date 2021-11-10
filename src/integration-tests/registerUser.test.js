const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Register new user', () => {
  describe('When it has invalid entries', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'myemail@cookmaster.com',
          password: 'abc123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('returns status code 400', (done) => {
      expect(response).to.have.status(400);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('"message" property has text "Email already registered"', (done) => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
      done();
    });
  });

  describe('When "email" already exists', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'Laura Gusmao',
        email: 'myemail@cookmaster.com',
        password: 'abc123',
        role: 'user',
      });

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Laura Gusmao',
          email: 'myemail@cookmaster.com',
          password: 'abc123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('returns status code 409', (done) => {
      expect(response).to.have.status(409);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('"message" property has text "Email already registered"', (done) => {
      expect(response.body.message).to.be.equal('Email already registered');
      done();
    });
  });

  describe('When new user is successfully created', () => {
    let connectionMock;
    let response;

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'Laura Gusmao',
          email: 'email@cookmaster.com',
          password: 'password123',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('returns status code 201', (done) => {
      expect(response).to.have.status(201);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('returns "user" property', (done) => {
      expect(response.body).to.have.property('user');
      done();
    });
  });
});
