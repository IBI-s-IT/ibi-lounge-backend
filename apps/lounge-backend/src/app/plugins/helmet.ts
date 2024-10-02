import { FastifyInstance } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyHelmet, { global: true });
});
