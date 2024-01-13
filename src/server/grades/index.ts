import {FastifyInstance, FastifyRequest} from "fastify";
import {GradesQuery} from "@server/api/grades/types";
import {getGrades} from "@server/api/grades/getGrades";

type GradesRequest = FastifyRequest<{
  Querystring: GradesQuery
}>

export async function gradesRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/grades',
    handler: async (request: GradesRequest, reply) => {
      return getGrades(request.query);
    }
  })
}