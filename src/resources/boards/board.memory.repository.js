const NotFoundError = require('../../errors/not.found.error');
const Board = require("./board.model");

const boardsDB = []

const getAll = async () => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      resolve(boardsDB);
    }, 2);
  })
;

const getBoardByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const board1 = boardsDB.find(boardA => boardA.id === uuid)
      if (!board1)
      {
        reject(new NotFoundError(`Board with uuid = ${uuid} not found`));
      }
      resolve(board1);
    }, 2);
  })
;

const deleteByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const board2 = boardsDB.find(boardB => boardB.id === uuid)
      if (!board2)
      {
        reject(new NotFoundError(`User with uuid = ${uuid} not found`));
      }
      boardsDB.splice(boardsDB.indexOf(board2), 1);
      resolve(true);
    }, 2);
  })
;

const addBoard = async (obj) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      boardsDB.push(new Board(obj));
      resolve(boardsDB[boardsDB.length - 1]);
    }, 2);
  })
;

module.exports = { getAll, addBoard, getBoardByUUID, deleteByUUID};
