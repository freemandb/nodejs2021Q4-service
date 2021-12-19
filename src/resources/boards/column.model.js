const {v4:uuid}= require('uuid');

class Column {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  toJsonResponse() {
    const { id, title, order} = this;
    return { id, title, order};
  }
}

module.exports = Column;