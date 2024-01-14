import { FastifyInstance, FastifyRequest } from 'fastify';
import { getSchedules } from '@server/schedules/getSchedules';
import {
  schedulesRequestQuery,
  schedulesSchema as schema,
} from '@server/schedules/schema';
import { FromSchema } from 'json-schema-to-ts';

type SchedulesRequest = FastifyRequest<{
  Querystring: FromSchema<typeof schedulesRequestQuery>;
}>;

export async function schedulesRoutes(fastify: FastifyInstance) {
  fastify.get('/schedules', { schema }, async (request: SchedulesRequest) => {
    return getSchedules(request.query);
  });
}
