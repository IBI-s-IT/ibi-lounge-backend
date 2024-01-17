import Fastify from 'fastify';
import qs from 'qs';
import { fastifyHelmet } from '@fastify/helmet';
import { fastifyCors } from '@fastify/cors';
import { ALLOWED_ORIGINS } from '../src/shared/headers';
import fastifySwagger from '@fastify/swagger';
import { schedulesRoutes } from '../src/server/schedules';
import { gradesRoutes } from '../src/server/grades';
import { listRoutes } from '../src/server/list';
import Ajv from 'ajv/dist/2020';
import { writeFileSync } from 'node:fs';
import { openApiSchemaDescription } from '../src/server/schema';

const ajv = new Ajv({
  removeAdditional: 'all',
});

const fastify = Fastify({
  logger: true,
  querystringParser: (str) => qs.parse(str),
}).setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema);
});

fastify.register(fastifyHelmet, { global: true });
fastify.register(fastifyCors, {
  origin: ALLOWED_ORIGINS,
});
fastify.register(fastifySwagger, {
  openapi: openApiSchemaDescription,
});

fastify.register(schedulesRoutes);
fastify.register(gradesRoutes);
fastify.register(listRoutes);

const start = async () => {
  try {
    await fastify.ready();
    writeFileSync(
      'schema.json',
      JSON.stringify(fastify.swagger(), null, 2),
      {}
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
void start();
