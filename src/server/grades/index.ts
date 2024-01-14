import { FastifyInstance, FastifyRequest } from 'fastify';
import { GradesQuery } from '@server/grades/types';
import { getGrades } from '@server/grades/getGrades';
import { gradesSchema as schema } from '@server/grades/schema';

type GradesRequest = FastifyRequest<{
  Querystring: GradesQuery;
}>;

export async function gradesRoutes(fastify: FastifyInstance) {
  fastify.get('/grades', { schema }, async (request: GradesRequest) => {
    return getGrades(request.query);
  });
}
