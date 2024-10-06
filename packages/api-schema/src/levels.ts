import { listResponse } from './list.js';
import { errorsSchema } from './errors.js';

export const levelsQuery = {
  type: 'object',
  properties: {},
} as const;

const levelsRequest = {
  description: 'Выдаёт список уровней образования',
  querystring: levelsQuery,
};

export const levelsSchema = {
  ...levelsRequest,
  tags: ['Списки'],
  response: {
    200: listResponse,
    ...errorsSchema,
  },
};
