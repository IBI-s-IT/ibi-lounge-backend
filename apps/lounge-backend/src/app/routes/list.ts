import { FastifyInstance, FastifyRequest } from 'fastify';
import { generateGroups, generateLevels } from '@repo/generators';
import { generateTeachers } from '../generators/teachers.js';
import { groupsSchema, type GroupsQuery } from '@repo/api-schema/groups';
import { linkItem, linksSchema, sectionItem } from '@repo/api-schema/links';
import { levelsSchema } from '@repo/api-schema/levels';
import { teachersSchema } from '@repo/api-schema/teachers';
import { listEntry } from '@repo/api-schema/list';
import { NewsQuery, newsRow, newsSchema } from '@repo/api-schema/news';
import { generateLinks } from '../generators/links.js';
import { generateNews } from '../generators/news.js';

type Groups = FastifyRequest<{
  Querystring: GroupsQuery;
}>;

type News = FastifyRequest<{
  Querystring: NewsQuery;
}>;

export default async function (fastify: FastifyInstance) {
  fastify.addSchema(listEntry);
  fastify.addSchema(sectionItem);
  fastify.addSchema(linkItem);
  fastify.addSchema(newsRow);

  fastify.get('/groups', { schema: groupsSchema }, async (request: Groups) => {
    return generateGroups(request.query);
  });

  fastify.get('/levels', { schema: levelsSchema }, async () => {
    return generateLevels();
  });

  fastify.get('/teachers', { schema: teachersSchema }, () => {
    return generateTeachers();
  });

  fastify.get('/links', { schema: linksSchema }, () => {
    return generateLinks();
  });

  fastify.get('/news', { schema: newsSchema }, (request: News) => {
    return generateNews(request.query);
  });
}
