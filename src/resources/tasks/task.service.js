const {validate:validateUUID} = require('uuid');
const tasksRepo = require('./task.memory.repository');
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

const processGetAllTasks = async (req, res) => {
    const tasks = await tasksRepo.getAll();
    const objTasks = tasks.map(task => task.toJsonResponse());
    res.code(STATUS_OK_CODES.OK);
    res.header(...contentTypeJson);
    res.send(objTasks);
}

const processCreateNewTask = async (req, res) => {
    try {
        const {boardId} = req.params;
        if (!validateUUID(boardId))
        {
            throw new BadRequestError('boardId UUID is invalid');
        }
        // const board = await boardsRepo.getBoardByUUID(boardId);
        const { id, title, order, description, userId, columnId } = req.body;
        // if (!validateUUID(columnId))
        // {
        //     throw new BadRequestError('columnId UUID is invalid');
        // }
        // const column = board.columns.find(column => column.id === columnId);
        // if (!column) {
        //     throw new BadRequestError('columnId UUID is invalid');
        // }
        const task = await tasksRepo.addTask({ id, title, order, description, userId, boardId, columnId })
        res.code(STATUS_OK_CODES.CREATED);
        res.header(...contentTypeJson);
        res.send(task.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
}

const processGetByUUID = async (req, res) => {
    
    try {
        const {taskId} = req.params;
        if (!validateUUID(taskId))
        {
            throw new BadRequestError('Task UUID is invalid');
        }
        const task = await tasksRepo.getByUUID(taskId)
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(task.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
}

const processChangeByUUID = async (req, res) => {
    const {/* boardId, */taskId} = req.params;
    try {
        if (!validateUUID(taskId))
        {
            throw new BadRequestError('Task UUID is invalid');
        }
        // if (!validateUUID(boardId))
        // {
        //     throw new BadRequestError('boardId UUID is invalid');
        // }
        // const board = await boardsRepo.getBoardByUUID(boardId);
        const task = await tasksRepo.getByUUID(taskId)
        const { title, order, description, userId, columnId } = req.body;
        // if (!validateUUID(userId))
        // {
        //     throw new BadRequestError('userId UUID is invalid');
        // }
        // if (!validateUUID(columnId))
        // {
        //     throw new BadRequestError('columnId UUID is invalid');
        // }
        // const column = board.columns.find(column => column.id === columnId);
        // if (!column) {
        //     throw new BadRequestError('columnId UUID is invalid');
        // }
        task.title = title;
        task.order = order;
        task.description = description;
        task.userId = userId;
        task.columnId = columnId;
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(task.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
    
}

const processDeleteByUUID = async (req, res) => {
    try {
        const {taskId} = req.params;
        if (!validateUUID(taskId))
        {
            throw new BadRequestError('taskId UUID is invalid');
        }
        await tasksRepo.deleteByUUID(taskId);
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send({});
    } catch (error) {
        errorHandler(error, res);
    }
    
}

module.exports = { processGetByUUID, processGetAllTasks, processCreateNewTask, processChangeByUUID, processDeleteByUUID};
