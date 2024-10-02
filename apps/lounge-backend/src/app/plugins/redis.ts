import { FastifyInstance } from 'fastify';
import fastifyRedis from '@fastify/redis';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifyRedis, {
    host: '127.0.0.1',
    port: 6379,
  });
});
