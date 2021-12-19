// const router = require('express').Router();
// const User = require('./user.model');
const usersService = require('./user.service');

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
const {URL_MAIN_PATH} = require('../../common/codes')

const typeString = { type: ['string', 'null'], nullable: true };

const userSchema = {
  type: 'object',
  properties: {
    id: typeString,
    name: typeString,
    login: typeString
  }
}

const errorSchema = {
  type: 'object',
  properties: {
    message: typeString
  }
}

const createUserSchema = {
  type: 'object',
  properties: {
    name: typeString,
    login: typeString,
    password: typeString
  },
  required: ['name', 'login', 'password']
}

const updateUserSchema = {
  type: 'object',
  properties: {
    name: typeString,
    login: typeString,
    password: typeString,
    id: typeString
  },
  required: ['name', 'login', 'password', 'id']
}

const getAllUsersOpts = {
  schema: {
    response: {
      CODE_OK: {
        type: 'array',
        items: userSchema
      }
    }
  },
  handler: usersService.processGetAllUsers
}

const getUserByUUIDOpts = {
  schema: {
    response: {
      200: userSchema,
      400: errorSchema,
      404: errorSchema
    }
  },
  handler: usersService.processGetUserByUUID
}

const changeUserByUUIDOpts = {
  schema: {
    body: updateUserSchema,
    response: {
      200: userSchema,
      400: errorSchema,
      404: errorSchema
    }
  },
  handler: usersService.processChangeUserByUUID
}

const deleteUserByUUIDOpts = {
  schema: {
    response: {
    }
  },
  handler: usersService.processDeleteUserByUUID
}

const createUserOpts = {
  schema: {
    body : createUserSchema,
    response: {
      201: userSchema,
      400: errorSchema,
      404: errorSchema
    }
  },
  handler: usersService.processCreateNewUser
}

const userRoutes = (fastify, options, done)  => {

  fastify.get(`/${URL_MAIN_PATH}`, getAllUsersOpts);

  fastify.post(`/${URL_MAIN_PATH}`, createUserOpts);

  fastify.get(`/${URL_MAIN_PATH}/:id`, getUserByUUIDOpts);

  fastify.put(`/${URL_MAIN_PATH}/:id`, changeUserByUUIDOpts);

  fastify.delete(`/${URL_MAIN_PATH}/:id`, deleteUserByUUIDOpts);

  done();
}

module.exports = userRoutes;
