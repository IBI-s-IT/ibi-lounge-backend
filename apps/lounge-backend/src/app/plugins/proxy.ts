import { FastifyInstance } from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import fp from 'fastify-plugin';
import path from 'path';
import { readdirSync } from 'fs';

const __subpath = process.env['TMA_SUBPATH'];
const __vite_dev_paths = ['/src', '/@vite', '/@fs', '/@react-refresh'];

export default fp(async function (fastify: FastifyInstance) {
  if (process.env['NODE_ENV'] !== 'development') {
    return;
  }

  const __pubdir = path.resolve(
    process.cwd(),
    '../../apps/lounge-bot-tma/public'
  );
  const __pubfiles = readdirSync(__pubdir);

  console.log('Enabled proxy for TMA because NODE_ENV was set to development!');

  fastify.register(fastifyHttpProxy, {
    upstream: `http://localhost:4200/${__subpath}`,
    prefix: `/${__subpath}`, // optional,
    rewritePrefix: '',
    http2: false, // optional,
    websocket: true,
    wsUpstream: 'ws://localhost:4200/',
    replyOptions: {
      rewriteHeaders(headers, request) {
        const hostname = request?.hostname ?? 'localhost';
        headers['Content-Security-Policy'] =
          `connect-src ws://localhost:4200 ws://localhost:3000 https://unpkg.com https://cdn.jsdelivr.net https://${hostname}/ wss://${hostname}/`;

        return headers;
      },
    },
  });

  __vite_dev_paths.forEach((path) => {
    fastify.register(fastifyHttpProxy, {
      upstream: `http://localhost:4200/${__subpath}${path}`,
      prefix: `/${__subpath}/${path}`,
      rewritePrefix: `/${__subpath}/${path}`,
      http2: false,
    });
  });

  __pubfiles.forEach((fileName) => {
    fastify.register(fastifyHttpProxy, {
      upstream: `http://localhost:4200/tma/${fileName}`,
      prefix: `/${fileName}`, // optional
      rewritePrefix: `/tma/${fileName}`, // optional
      http2: false, // optional
    });
  });
});
