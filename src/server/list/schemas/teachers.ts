import { listResponse } from '@server/list/schemas/response';
import { errorsSchema } from '@shared/errors';

export const teachersQuery = {
  type: 'object',
  properties: {},
} as const;

const teachersRequest = {
  description: 'Выдаёт список учителей',
  querystring: teachersQuery,
};

export const teachersSchema = {
  ...teachersRequest,
  tags: ['Списки'],
  response: {
    200: listResponse,
    ...errorsSchema,
  },
};
