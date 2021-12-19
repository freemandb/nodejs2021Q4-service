// const router = require('express').Router();
// const User = require('./user.model');
const boardService = require('./board.service');

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
const {URL_BOARDS_PATH} = require('../../common/codes')

const typeString = { type: ['string', 'null'], nullable: true };
const typeInteger = {type: 'integer'};

const columnSchema = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    order: typeInteger
  }
}

const boardSchema = {
  type: 'object',
  properties: {
    id: typeString,
    title: typeString,
    columns: {
      type: 'array',
      items: columnSchema
    }
  }
}

const errorSchema = {
  type: 'object',
  properties: {
    message: typeString
  }
}

const createBoardSchema = {
  type: 'object',
  properties: {
    title: typeString,
    columns: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: typeString,
          order: typeInteger
        }
      }
    }
  },
  required: ['title', 'columns']
}

const getAllOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: boardSchema
      }
    }
  },
  handler: boardService.processGetAll
}

const getByUUIDOpts = {
  schema: {
    response: {
      200: boardSchema,
      400: errorSchema,
      404: errorSchema
    }
  },
  handler: boardService.processGetByUUID
}

const changeByUUIDOpts = {
  schema: {
    body: createBoardSchema,
    response: {
      200: boardSchema,
      400: errorSchema,
      404: errorSchema
    }
  },
  handler: boardService.processChangeByUUID
}

const deleteByUUIDOpts = {
  schema: {
    response: {
    }
  },
  handler: boardService.processDeleteByUUID
}

const createBoardOpts = {
  schema: {
    body : createBoardSchema,
    response: {
      201: boardSchema
    }
  },
  handler: boardService.processCreateNewBoard
}

const boardRoutes = (fastify, options, done)  => {

  fastify.get(`/${URL_BOARDS_PATH}`, getAllOpts);

  fastify.post(`/${URL_BOARDS_PATH}`, createBoardOpts);

  fastify.get(`/${URL_BOARDS_PATH}/:boardId`, getByUUIDOpts);

  fastify.put(`/${URL_BOARDS_PATH}/:boardId`, changeByUUIDOpts);

  fastify.delete(`/${URL_BOARDS_PATH}/:boardId`, deleteByUUIDOpts);

  done();
}

module.exports = boardRoutes;
