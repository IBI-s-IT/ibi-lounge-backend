import Fastify from 'fastify';
import qs from 'querystring';
import {schedulesRoutes} from "src/server/schedules";
import {fastifyHelmet} from "@fastify/helmet";
import {fastifyCors} from "@fastify/cors";
import {ALLOWED_ORIGINS} from "@shared/headers";
import {calendarRoutes} from "@server/api/calendar";
import {listRoutes} from "@server/api/list";
import {gradesRoutes} from "@server/api/grades";
import * as process from "process";

const fastify = Fastify({
  logger: true,
  querystringParser: str => qs.parse(str),
});

fastify.register(fastifyHelmet, { global: true })
fastify.register(fastifyCors, {
  origin: ALLOWED_ORIGINS,
})
fastify.register(listRoutes);
fastify.register(schedulesRoutes);
fastify.register(calendarRoutes);
fastify.register(gradesRoutes);

fastify.get('/', async (
  request,
  reply
) => {
  return { hello: 'world' }
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()