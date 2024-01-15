export const listQuery = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['levels', 'groups', 'teachers'] },
    level: { type: 'string' },
  },
  required: ['type'],
  additionalProperties: false,
} as const;

const listRequestSchema = {
  description: 'Выдаёт списки с id, name в зависимости от параметра type',
  querystring: listQuery,
};

export const listEntry = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
} as const;

const listResponseSchema = {
  type: 'array',
  items: listEntry,
};

export const listSchema = {
  ...listRequestSchema,
  response: {
    200: listResponseSchema,
  },
};
