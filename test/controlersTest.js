const { getUsers,getById, addUser } = require('../controller/user');
const getDao = require('../dao');

const expect = require('chai').expect;

describe('User controller', () => {
  describe('getUsers', () => {
    beforeEach(async () => {
      const daoClient = await getDao();
      await daoClient.clear();
    });

    it('retorna un array de usuarios que se añadieron', async () => {
      const username = 'nicholas';
      const password = '123';

      await addUser({
        username,
        password,
      });

      const result = await getUsers();
      expect(result).to.be.an('array');
      expect(result.length).to.be.eq(1);
      expect(result[0].nickname).to.be.eq(`${username} ${password}`);
      expect(result[0]).to.have.property('randomCode');
    });

    it('deberia retornar un array vacio si no se añadieron usuarios', async () => {
      const result = await getUsers();

      expect(result).to.be.an('array');
      expect(result.length).to.be.eq(0);
    });
  });

  describe('getUser', () => {
    beforeEach(async () => {
      const daoClient = await getDao();
      await daoClient.clear();
    });

    it(`deberia retornar null si el usuario no existe`, async () => {
      const result = await getById('123');

      expect(result).to.be.null;
    });

    it(`deberia retornar el usuario si existe`, async () => {
      const username = 'nicholas';
      const password = '123';

      const user = await addUser({
        username,
        password,
      });

      const result = await getById(username._id);

      expect(result).to.be.an('object');
      expect(result.nickname).to.be.eq(`${username} ${password}`);
      expect(result).to.have.property('randomCode');
    });
  });

  describe('addUser', () => {
    beforeEach(async () => {
      const daoClient = await getDao();
      await daoClient.clear();
    });

    it('deberia añadir un usuario a la base de datos', async () => {
      const username = 'nico';
      const password = '123';

      const result = await addUser({
        username,
        password,
      });

      expect(result).to.be.an('object');
      expect(result.nickname).to.be.eq(`${username} ${password}`);
      expect(result).to.have.property('randomCode');
    });

  });
});