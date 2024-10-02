import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateSchedules } from '@repo/generators';
import { schedulesSchema, type SchedulesQuery } from '@repo/api-schema';

type SchedulesRequest = FastifyRequest<{
  Querystring: SchedulesQuery;
}>;

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/schedules',
    { schema: schedulesSchema },
    async (request: SchedulesRequest) => {
      return generateSchedules(request.query);
    }
  );
}
