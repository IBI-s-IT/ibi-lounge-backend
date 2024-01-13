import Fastify from 'fastify';
import qs from 'querystring';
import {schedulesRoutes} from "src/server/schedules";
import {fastifyHelmet} from "@fastify/helmet";
import {fastifyCors} from "@fastify/cors";
import {ALLOWED_ORIGINS} from "@shared/headers";
import {calendarRoutes} from "@server/calendar";
import {listRoutes} from "@server/list";
import {gradesRoutes} from "@server/grades";

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

fastify.get('/', async () => {
  return { hello: 'world' }
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env['PORT']) ?? 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
void start()