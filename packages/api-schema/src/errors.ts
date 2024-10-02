export const errorSchema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    message: { type: 'string' },
    error: { type: 'string' },
    statusCode: { type: 'number' },
  },
  required: ['code', 'message'],
};

export const errorsSchema = {
  '4xx': errorSchema,
  '5xx': errorSchema,
};
