const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');

const connection = require('./connectionMock');
const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Register new admin', () => {
  let connectionMock;

  describe('When is not an admin regestering it', () => {
    let response = {};

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { body } = await chai.request(server)
        .post('/login')
        .send({
          email: 'myemail@cookmaster.com',
          password: 'abc123',
        });

      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'New Admin',
          email: 'newadmin@cookmaster.com',
          password: 'abc123',
        })
        .set({ 'authorization': body.token });
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('returns status code 403', (done) => {
      expect(response).to.have.status(403);
      done();
    });

    it('returns an object', (done) => {
      expect(response.body).to.be.an('object');
      done();
    });

    it('"message" property has text "Only admins can register new admins"', (done) => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
      done();
    });
  })

  describe('When new admin is successfully created', () => {
    let response= {};

    before(async () => {
      connectionMock = await connection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('Cookmaster').collection('users').insertOne({
        name: 'Admin',
        email: 'admin@cookmaster.com',
        password: 'abc123',
        role: 'admin',
      });

      const { body: { token } } = await chai.request(server)
        .post('/login')
        .send({
          email: 'admin@cookmaster.com',
          password: 'abc123',
        });

        console.log(`body: ${token}`);

      response = await chai.request(server)
        .post('/users/admin')
        .send({
          name: 'NewAdmin',
          email: 'new_admin@cookmaster.com',
          password: 'abc456',
        })
        .set({ 'authorization': token });
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
  })
});
