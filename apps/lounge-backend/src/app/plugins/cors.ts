import { fastifyCors } from '@fastify/cors';
import { ALLOWED_ORIGINS } from '../headers';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyCors, {
    origin: ALLOWED_ORIGINS,
  });
});
