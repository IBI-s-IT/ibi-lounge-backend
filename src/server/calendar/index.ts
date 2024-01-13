import {FastifyInstance, FastifyRequest} from "fastify";
import {getCalendar} from "@server/api/calendar/getCalendar";

export type CalendarQuery = { group: string };

type CalendarRequest = FastifyRequest<{
  Querystring: CalendarQuery
}>

export async function calendarRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/calendar',
    handler: async (request: CalendarRequest, reply) => {
      reply.headers({
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="schedules.ics"',
      });
      return getCalendar(request.query);
    }
  })
}