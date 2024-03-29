import Fastify from 'fastify';
import qs from 'qs';
import Ajv from 'ajv/dist/2020';
import { schedulesRoutes } from '@server/schedules';
import { fastifyHelmet } from '@fastify/helmet';
import { fastifyCors } from '@fastify/cors';
import { ALLOWED_ORIGINS } from '@shared/headers';
import { listRoutes } from '@server/list';
import { gradesRoutes } from '@server/grades';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { openApiSchemaDescription } from '@server/schema';

const ajv = new Ajv({
  removeAdditional: 'all',
});

const fastify = Fastify({
  logger: true,
  querystringParser: (str) => qs.parse(str),
})
  .withTypeProvider<JsonSchemaToTsProvider>()
  .setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });

fastify.register(fastifyHelmet, { global: true });
fastify.register(fastifyCors, {
  origin: ALLOWED_ORIGINS,
});
fastify.register(fastifySwagger, {
  openapi: openApiSchemaDescription,
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

fastify.register(schedulesRoutes);
fastify.register(gradesRoutes);
fastify.register(listRoutes);

fastify.get('/', async () => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env['PORT']) ?? 3000,
      host: '0.0.0.0',
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
