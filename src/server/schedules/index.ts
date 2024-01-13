import {FastifyInstance, FastifyRequest} from "fastify";
import {getSchedules} from "@server/schedules/getSchedules";
import {SchedulesQuery} from "@server/schedules/types";

type SchedulesRequest = FastifyRequest<{
  Querystring: SchedulesQuery
}>

export async function schedulesRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/schedules',
    handler: async (request: SchedulesRequest, reply) => {
      return getSchedules(request.query);
    }
  })
}