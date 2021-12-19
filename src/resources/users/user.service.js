const {validate:validateUUID} = require('uuid');
const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const {STATUS_OK_CODES} = require('../../common/codes');
const NotFoundError = require('../../errors/not.found.error');
const BadRequestError = require('../../errors/bad.request.error');

const contentTypeJson = ['Content-Type', 'application/json'];


/// ///////
function errorHandler(error, res)
{
    if (error instanceof NotFoundError
        || error instanceof BadRequestError)
    {
        res.code(error.code);
    }
    else
    {
        res.code(404);
    }
    res.header(...contentTypeJson);
    res.send({message:error.message});
}

const processGetAllUsers = async (req, res) => {
    const users = await usersRepo.getAll();
    const objUsers = users.map(user => user.toJsonResponse());
    res.code(STATUS_OK_CODES.OK);
    res.header(...contentTypeJson);
    res.send(objUsers);
}

const processCreateNewUser = async (req, res) => {
    const {name, login, password} = req.body;
    const user = await usersRepo.addUser({name, login, password})
    res.code(STATUS_OK_CODES.CREATED);
    res.header(...contentTypeJson);
    res.send(user.toJsonResponse());
}

const processGetUserByUUID = async (req, res) => {
    const {id} = req.params;
    try {
        if (!validateUUID(id))
        {
            throw new BadRequestError('UUID is invalid');
        }
        const user = await usersRepo.getUserByUUID(id)
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(user.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
}

const processChangeUserByUUID = async (req, res) => {
    try {
        const {id:userId} = req.params;
        if (!validateUUID(userId))
        {
            throw new BadRequestError('UUID is invalid');
        }
        const user = await usersRepo.getUserByUUID(userId)
        const {name, login, password, id} = req.body;
        user.id = id;
        user.name = name;
        user.login = login;
        user.password = password;
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(user.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
    
}

const processDeleteUserByUUID = async (req, res) => {
    
    try {
        const {id} = req.params;
        if (!validateUUID(id))
        {
            throw new BadRequestError('UUID is invalid');
        }
        await usersRepo.deleteUserByUUID(id)
        tasksRepo.clearUserId(id);
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send({});
    } catch (error) {
        errorHandler(error, res);
    }
    
}

module.exports = { processGetUserByUUID, processGetAllUsers, processCreateNewUser, processChangeUserByUUID, processDeleteUserByUUID};
