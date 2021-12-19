const {v4:uuid}= require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = 0,
    description = 'desc',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId === ''? null : userId;
    this.boardId = boardId === ''? null : boardId;
    this.columnId = columnId === ''? null : columnId;
  }

  toJsonResponse() {
    const { id, title, order, description, userId, boardId, columnId } = this;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
