import {FastifyInstance, FastifyRequest} from "fastify";
import {getGroups} from "@server/api/list/getGroups";
import {getTeachers} from "@server/api/list/getTeachers";
import {getLevels} from "@server/api/list/getLevels";

export type ListGroupsQuery = {
  type: 'groups';
  level: string;
}

export type ListTeachersQuery = {
  type: 'teachers';
}

export type ListLevelsQuery = {
  type: 'levels';
}

export type ListQuery = ListGroupsQuery | ListTeachersQuery | ListLevelsQuery;

type ListRequest = FastifyRequest<{
  Querystring: ListQuery
}>

export async function listRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/list',
    handler: async (request: ListRequest, reply) => {
      switch (request.query.type) {
        case "groups":
          return getGroups(request.query);
        case "teachers":
          return getTeachers();
        default:
          return getLevels();
      }
    }
  })
}