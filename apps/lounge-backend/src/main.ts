import Fastify from 'fastify';
import qs from 'qs';
import Ajv from 'ajv/dist/2020';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { app } from './app/app';

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

fastify.register(app);

const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env['PORT'] ?? 3000),
      host: '0.0.0.0',
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();
