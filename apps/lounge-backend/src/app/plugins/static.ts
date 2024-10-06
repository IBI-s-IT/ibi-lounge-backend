import { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';
import fp from 'fastify-plugin';
import path from 'path';

const __pubdir = path.resolve(process.cwd(), '../lounge-bot-tma/dist/');
const __subpath = process.env['TMA_SUBPATH'];

export default fp(async function (fastify: FastifyInstance) {
  if (process.env['NODE_ENV'] == 'development') {
    return;
  }

  fastify.register(fastifyStatic, {
    root: __pubdir,
    prefix: `/${__subpath}`,
    wildcard: true,
    prefixAvoidTrailingSlash: true,
    preCompressed: true,
    setHeaders(res) {
      res.setHeader(
        'Content-Security-Policy',
        'https://unpkg.com https://cdn.jsdelivr.net'
      );
    },
  });

  console.log("Serving static because we're in production");
});
