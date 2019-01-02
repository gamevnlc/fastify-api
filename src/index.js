// Require the framework and instantiate it
const fastify = require('fastify')({
   logger: true
});

// Require external modules
const mongoose = require('mongoose');

// Import Swagger Options
const swagger = require('./config/swagger');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Import routes
const routes = require('./routes');
routes.forEach((route, index) => {
    fastify.route(route)
});

// Connect to DB
mongoose.connect('mongodb://localhost:27017/fastify-api',
    {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB connected..')
    })
    .catch(err => console.log(err));

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world'}
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.swagger();
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (e) {
        fastify.log.error(e);
        process.exit(1)
    }
};

start();