const {v4:uuid}= require('uuid');
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'TITLE',
    columns = []
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }

  toJsonResponse() {
    const { id, title, columns} = this;
    return { id, title, columns: columns.map(column => column.toJsonResponse())};
  }
}

module.exports = Board;
