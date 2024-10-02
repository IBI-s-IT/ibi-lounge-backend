import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateGrades } from '../generators/grades';
import { gradesSchema as schema, type GradesQuery } from '@repo/api-schema';

type GradesRequest = FastifyRequest<{
  Querystring: GradesQuery;
}>;

export default async function (fastify: FastifyInstance) {
  fastify.get('/grades', { schema }, async (request: GradesRequest) => {
    return generateGrades(request.query);
  });
}
