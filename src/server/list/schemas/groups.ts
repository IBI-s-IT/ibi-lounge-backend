import { listResponse } from '@server/list/schemas/response';

export const groupsQuery = {
  type: 'object',
  properties: {
    level: { type: 'string' },
  },
  required: ['level'],
} as const;

const groupsRequest = {
  description: 'Выдаёт список групп',
  querystring: groupsQuery,
};

export const groupsSchema = {
  ...groupsRequest,
  tags: ['Списки'],
  response: {
    200: listResponse,
  },
};
