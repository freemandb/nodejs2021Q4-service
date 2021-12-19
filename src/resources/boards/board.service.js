const {validate:validateUUID} = require('uuid');
const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const {STATUS_OK_CODES} = require('../../common/codes');
const NotFoundError = require('../../errors/not.found.error');
const BadRequestError = require('../../errors/bad.request.error');
const Column = require('./column.model');

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

const processGetAll = async (req, res) => {
    const boards = await boardsRepo.getAll();
    const objBoards = boards.map(user => user.toJsonResponse());
    res.code(STATUS_OK_CODES.OK);
    res.header(...contentTypeJson);
    res.send(objBoards);
}

const processCreateNewBoard = async (req, res) => {
    const {title, columns} = req.body;
    const board = await boardsRepo.addBoard({title, columns})
    res.code(STATUS_OK_CODES.CREATED);
    res.header(...contentTypeJson);
    res.send(board.toJsonResponse());
}

const processGetByUUID = async (req, res) => {
    const {boardId} = req.params;
    try {
        if (!validateUUID(boardId))
        {
            throw new BadRequestError('boardId UUID is invalid');
        }
        const board = await boardsRepo.getBoardByUUID(boardId);
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(board.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
}

const processChangeByUUID = async (req, res) => {
    const {boardId} = req.params;
    try {
        if (!validateUUID(boardId))
        {
            throw new BadRequestError('UUID is invalid');
        }
        const board = await boardsRepo.getBoardByUUID(boardId)
        const {title, columns} = req.body;
        board.title = title;
        board.columns.forEach(column => tasksRepo.clearColumnUUID(column.id))
        board.columns = columns.map(column => new Column(column));
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send(board.toJsonResponse());
    } catch (error) {
        errorHandler(error, res);
    }
    
}

const processDeleteByUUID = async (req, res) => {
    const {boardId} = req.params;
    try {
        if (!validateUUID(boardId))
        {
            throw new BadRequestError('boardId UUID is invalid');
        }
        await boardsRepo.deleteByUUID(boardId)
        tasksRepo.deleteTasksByBoardUUID(boardId);
        res.code(STATUS_OK_CODES.OK);
        res.header(...contentTypeJson);
        res.send({});
    } catch (error) {
        errorHandler(error, res);
    }
    
}

module.exports = { processGetByUUID, processGetAll, processCreateNewBoard, processChangeByUUID, processDeleteByUUID};
