import { listResponse } from './list';
import { errorsSchema } from './errors';

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
