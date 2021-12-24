const faker = require('faker');

class UsersService {

  constructor() {
    this.users = [];
  }

  register(body) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...body
    }
    this.users.push(newUser)
    return newUser;
  }

  find() {
    if (this.users.length === 0) {
      throw new Error('There Not Users')
    }
    return this.users;
  }
}

module.exports = UsersService;
