const NotFoundError = require('../../errors/not.found.error');
const Task = require("./task.model");

const tasksDB = []

const clearUserId = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < tasksDB.length; i+=1)
      {
        if (tasksDB[i].userId === uuid) {
          tasksDB[i].userId = null;
        }
      }
      
      resolve(tasksDB);
    }, 2);
  })
;

const deleteTasksByBoardUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      for (let i = tasksDB.length - 1; i > -1; i-=1)
      {
        if (tasksDB[i].boardId === uuid)
        {
          tasksDB.splice(i, 1);
        }
      }
      resolve(true);
    }, 2);
  })
;

const clearColumnUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < tasksDB.length;)
      {
        if (tasksDB[i].columnId === uuid) {
          tasksDB[i].columnId = null;
        }
      }
      resolve(true);
    }, 2);
  })
;

const getAll = async () => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasksDB);
    }, 2);
  })
;

const getByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const task = tasksDB.find(taskObj => taskObj.id === uuid)
      if (!task)
      {
        reject(new NotFoundError(`Task with uuid = ${uuid} not found`));
      }
      resolve(task);
    }, 2);
  })
;

const deleteByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const task = tasksDB.find(user => user.id === uuid)
      if (!task)
      {
        reject(new NotFoundError(`Task with uuid = ${uuid} not found`));
      }
      tasksDB.splice(tasksDB.indexOf(task), 1);
      resolve(true);
    }, 2);
  })
;

const addTask = async (obj) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      tasksDB.push(new Task(obj));
      resolve(tasksDB[tasksDB.length - 1]);
    }, 2);
  })
;

module.exports = { getAll, addTask, getByUUID, deleteByUUID, clearColumnUUID, deleteTasksByBoardUUID, clearUserId};
