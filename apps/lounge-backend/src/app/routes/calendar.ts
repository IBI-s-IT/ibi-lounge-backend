import { FastifyInstance, FastifyRequest } from 'fastify';
import { calendarGenerator } from '../generators/calendar.js';
import { calendarSchema, type CalendarQuery } from '@repo/api-schema/calendar';

type CalendarRequest = FastifyRequest<{
  Querystring: CalendarQuery;
}>;

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/calendar',
    { schema: calendarSchema },
    async (request: CalendarRequest, reply) => {
      reply.headers({
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="schedules.ics"',
      });
      return calendarGenerator(request.query);
    }
  );
}
