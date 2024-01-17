import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateGroups } from '@server/list/generators/generateGroups';
import { generateTeachers } from '@server/list/generators/generateTeachers';
import { generateLevels } from '@server/list/generators/generateLevels';
import { groupsSchema } from '@server/list/schemas/groups';
import { levelsSchema } from '@server/list/schemas/levels';
import { teachersSchema } from '@server/list/schemas/teachers';
import { GroupsQuery } from '@server/list/types';
import { listEntry } from '@server/list/schemas/response';

type Groups = FastifyRequest<{
  Querystring: GroupsQuery;
}>;

export async function listRoutes(fastify: FastifyInstance) {
  fastify.addSchema(listEntry);

  fastify.get('/groups', { schema: groupsSchema }, async (request: Groups) => {
    return generateGroups(request.query);
  });

  fastify.get('/levels', { schema: levelsSchema }, async () => {
    return generateLevels();
  });

  fastify.get('/teachers', { schema: teachersSchema }, () => {
    return generateTeachers();
  });
}
