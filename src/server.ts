import Fastify from 'fastify';
import qs from 'querystring';
import {schedulesRoutes} from "src/server/schedules";
import {fastifyHelmet} from "@fastify/helmet";
import {fastifyCors} from "@fastify/cors";
import {ALLOWED_ORIGINS} from "@shared/headers";
import {calendarRoutes} from "@server/calendar";
import {listRoutes} from "@server/list";
import {gradesRoutes} from "@server/grades";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";

const fastify = Fastify({
  logger: true,
  querystringParser: str => qs.parse(str),
}).withTypeProvider<JsonSchemaToTsProvider>();

fastify.register(fastifyHelmet, { global: true })
fastify.register(fastifyCors, {
  origin: ALLOWED_ORIGINS,
})
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'IBI Lounge Backend',
      description: 'Бекенд для получения расписания и прочего в удобном формате',
      version: '2.0.0'
    },
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

fastify.register(listRoutes);
fastify.register(schedulesRoutes);
fastify.register(calendarRoutes);
fastify.register(gradesRoutes);

fastify.get('/', async () => {
  return { hello: 'world' }
});

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env['PORT']) ?? 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
void start()