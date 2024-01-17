import { FastifyInstance, FastifyRequest } from 'fastify';
import { generator } from '@server/schedules/generator';
import {
  schedulesQuery,
  schedulesSchema as schema,
} from '@server/schedules/schema';
import { FromSchema } from 'json-schema-to-ts';

type SchedulesRequest = FastifyRequest<{
  Querystring: FromSchema<typeof schedulesQuery>;
}>;

export async function schedulesRoutes(fastify: FastifyInstance) {
  fastify.get('/schedules', { schema }, async (request: SchedulesRequest) => {
    return generator(request.query);
  });
}
