const User = require("./user.model");
const NotFoundError = require('../../errors/not.found.error');

const usersDB = []

const getAll = async () => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersDB);
    }, 2);
  })
;

const getUserByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersDB.find(userA => userA.id === uuid)
      if (!user)
      {
        reject(new NotFoundError(`User with uuid = ${uuid} not found`));
      }
      resolve(user);
    }, 2);
  })
;

const deleteUserByUUID = async (uuid) => 
  // TODO: mock implementation. should be replaced during task development
    new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usersDB.find(userB => userB.id === uuid)
      if (!user)
      {
        reject(new NotFoundError(`User with uuid = ${uuid} not found`));
      }
      usersDB.splice(usersDB.indexOf(user), 1);
      resolve(true);
    }, 2);
  })
;

const addUser = async (userObj) => 
  // TODO: mock implementation. should be replaced during task development
   new Promise((resolve) => {
    setTimeout(() => {
      usersDB.push(new User(userObj));
      resolve(usersDB[usersDB.length - 1]);
    }, 2);
  })
;

module.exports = { getAll, addUser, getUserByUUID, deleteUserByUUID};
