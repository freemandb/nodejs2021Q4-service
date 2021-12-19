// const router = require('express').Router();
// const User = require('./user.model');
const taskService = require('./task.service');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

// router.route('/').post(async (req, res) => {
//   const user = await usersService.addUser();
//   // map user fields to exclude secret fields like "password"
//   res.json(User.toResponse(user));
// });

// router.route('/:id').get(async (req, res) => {
//   const {id:uuid} = req.params;
//   try {
//     const user = await usersService.getUserByUUID(uuid);
//     res.json(User.toResponse(user));
//   }
//   catch (e) {
//     console.log("ERROR = "+e.message);
//     res.status(500).json({message: e.message});
//   }
  
//   // map user fields to exclude secret fields like "password"
  
// });
const {URL_BOARDS_PATH, URL_TASKS_PATH} = require('../../common/codes')

const typeString = { type: ['string', 'null'], nullable: true };
const typeInteger = {type: 'integer'};

const taskSchema = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    order: typeInteger,
    description: typeString,
    userId: typeString,
    boardId: typeString,
    columnId: typeString
  }
}

const errorSchema = {
  type: 'object',
  properties: {
    message: typeString
  }
}

const createTaskSchema = {
  type: 'object',
  properties: {
    title: typeString,
    order: typeInteger,
    description: typeString,
    userId: typeString,
    columnId: typeString,
  },
  required: ['title', 'description']
}

const getAllTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: taskSchema
      }
    }
  },
  handler: taskService.processGetAllTasks
}

const getByUUIDOpts = {
  schema: {
    response: {
      200: taskSchema,
      404: errorSchema,
      400: errorSchema
    }
  },
  handler: taskService.processGetByUUID
}

const changeByUUIDOpts = {
  schema: {
    body: createTaskSchema,
    response: {
      200: taskSchema,
      404: errorSchema,
      400: errorSchema
    }
  },
  handler: taskService.processChangeByUUID
}

const deleteByUUIDOpts = {
  schema: {
    response: {
    }
  },
  handler: taskService.processDeleteByUUID
}

const createTaskOpts = {
  schema: {
    body : createTaskSchema,
    response: {
      201: taskSchema
    }
  },
  handler: taskService.processCreateNewTask
}

const taskRoutes = (fastify, options, done)  => {

  fastify.get(`/${URL_BOARDS_PATH}/:boardId/${URL_TASKS_PATH}`, getAllTasksOpts);

  fastify.post(`/${URL_BOARDS_PATH}/:boardId/${URL_TASKS_PATH}`, createTaskOpts);

  fastify.get(`/${URL_BOARDS_PATH}/:boardId/${URL_TASKS_PATH}/:taskId`, getByUUIDOpts);

  fastify.put(`/${URL_BOARDS_PATH}/:boardId/${URL_TASKS_PATH}/:taskId`, changeByUUIDOpts);

  fastify.delete(`/${URL_BOARDS_PATH}/:boardId/${URL_TASKS_PATH}/:taskId`, deleteByUUIDOpts);

  done();
}

module.exports = taskRoutes;
