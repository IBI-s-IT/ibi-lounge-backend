import { FromSchema } from 'json-schema-to-ts';
import { listResponse } from './list';
import { errorsSchema } from './errors';

export type GroupsQuery = FromSchema<typeof groupsQuery>;

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
    ...errorsSchema,
  },
};
