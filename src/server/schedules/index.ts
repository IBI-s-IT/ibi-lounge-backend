import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateSchedules } from '@server/schedules/generators/schedules';
import { schedulesSchema } from '@server/schedules/schemas/schedules';
import { calendarGenerator } from '@server/schedules/generators/calendar';
import { CalendarQuery, SchedulesQuery } from '@server/schedules/types';
import { calendarSchema } from '@server/schedules/schemas/calendar';

type SchedulesRequest = FastifyRequest<{
  Querystring: SchedulesQuery;
}>;

type CalendarRequest = FastifyRequest<{
  Querystring: CalendarQuery;
}>;

export async function schedulesRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/schedules',
    { schema: schedulesSchema },
    async (request: SchedulesRequest) => {
      return generateSchedules(request.query);
    }
  );

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
