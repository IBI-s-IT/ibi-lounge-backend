import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateGroups, generateLevels } from '@repo/generators';
import { generateTeachers } from '../generators/teachers.js';
import { groupsSchema, type GroupsQuery } from '@repo/api-schema/groups';
import { levelsSchema } from '@repo/api-schema/levels';
import { teachersSchema } from '@repo/api-schema/teachers';
import { listEntry } from '@repo/api-schema/list';

type Groups = FastifyRequest<{
  Querystring: GroupsQuery;
}>;

export default async function (fastify: FastifyInstance) {
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
