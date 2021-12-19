const { PORT } = require('./common/config');
const fastifyServer = require('./app');


const startServer = async () => {
  try {
    await fastifyServer.listen(PORT);
  } catch (error) {
    fastifyServer.log.error(error);
    process.exit(1);
  }
}

startServer();