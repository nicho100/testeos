const { config } = require('../../config/enviorment');
const getDao = require('../../dao');
const request = require('supertest')(`http://localhost:${config.puerto}`);
const expect = require('chai').expect;

describe('Users api test', () => {
  
  describe('POST /signup', () => {
    beforeEach(async () => {
      const daoClient = await getDao();
      await daoClient.clear();
    });

    it('deberia retornar 200 si el usuario es valido', async () => {
      const user = {
        username: 'nico@hotmail.com',
        password: '123',
      };

      const response = await request.post('/signup').send(user);

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('randomCode');
    });

    it('deberia retornar 400 si el usuario es invalido', async () => {
      const user = {
        username: 'nicholas@hotmail.com',
        password: '356',
      };

      const response = await request.post('/login').send(user);

      expect(response.status).to.be.eq(400);
    });
  });
});