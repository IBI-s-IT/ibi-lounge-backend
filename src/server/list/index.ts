import { FastifyInstance, FastifyRequest } from 'fastify';
import { getGroups } from '@server/list/generators/getGroups';
import { getTeachers } from '@server/list/generators/getTeachers';
import { getLevels } from '@server/list/generators/getLevels';
import { listQuery, listSchema as schema } from '@server/list/schema';
import { FromSchema } from 'json-schema-to-ts';

type ListRequest = FastifyRequest<{
  Querystring: FromSchema<typeof listQuery>;
}>;

export async function listRoutes(fastify: FastifyInstance) {
  fastify.get('/list', { schema }, async (request: ListRequest) => {
    switch (request.query.type) {
      case 'groups':
        return getGroups(request.query);
      case 'teachers':
        return getTeachers();
      default:
        return getLevels();
    }
  });
}
