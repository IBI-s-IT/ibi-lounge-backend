import { FastifyInstance, FastifyRequest } from 'fastify';
import { getCalendar } from '@server/calendar/getCalendar';
import { calendarSchema as schema } from '@server/calendar/schema';
import { CalendarQuery } from '@server/calendar/types';

type CalendarRequest = FastifyRequest<{
  Querystring: CalendarQuery;
}>;

export async function calendarRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/calendar',
    { schema },
    async (request: CalendarRequest, reply) => {
      reply.headers({
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="schedules.ics"',
      });
      return getCalendar(request.query);
    }
  );
}
