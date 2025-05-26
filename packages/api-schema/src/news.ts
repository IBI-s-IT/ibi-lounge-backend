import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { errorsSchema } from './errors.js';

export type NewsRow = FromSchema<typeof newsRow>;
export type NewsResponse = FromSchema<
  typeof newsResponse,
  { references: [typeof newsRow] }
>;
export type NewsQuery = FromSchema<typeof newsQuery>;

export const newsQuery = {
  type: 'object',
  properties: {
    lang: {
      type: 'string',
      enum: ['ru', 'en'],
    },
  },
} as const satisfies JSONSchema;

const newsRequest = {
  description: 'Выдаёт новости',
  querystring: newsQuery,
};

export const newsRow = {
  $id: 'newsRow',
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    button_text: { type: 'string' },
    button_url: { type: 'string' },
    created_at: { type: 'string' },
    author: { type: 'string' },
  },
  required: ['title', 'description', 'created_at', 'author'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export const newsResponse = {
  type: 'array',
  items: { $ref: 'newsRow' },
} as const satisfies JSONSchema;

export const newsSchema = {
  ...newsRequest,
  tags: ['Списки'],
  response: {
    200: newsResponse,
    ...errorsSchema,
  },
};
