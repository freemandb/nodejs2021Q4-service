const {v4:uuid}= require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  toJsonResponse() {
    const { id, name, login, password } = this;
    return { id, name, login, password };
  }

  static toResponse(user) {
    const { id, name, login, password } = user;
    return { id, name, login, password };
  }
}

module.exports = User;
