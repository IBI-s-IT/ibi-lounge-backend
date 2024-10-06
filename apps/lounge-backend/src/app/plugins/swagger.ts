import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import { openApiSchemaDescription } from '../../schema.js';
import fastifySwaggerUi from '@fastify/swagger-ui';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    openapi: openApiSchemaDescription,
  });

  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
});
