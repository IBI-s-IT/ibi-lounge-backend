import {FastifyInstance, FastifyRequest} from "fastify";
import {GradesQuery} from "@server/grades/types";
import {getGrades} from "@server/grades/getGrades";

type GradesRequest = FastifyRequest<{
  Querystring: GradesQuery
}>

export async function gradesRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/grades',
    handler: async (request: GradesRequest) => {
      return getGrades(request.query);
    }
  })
}