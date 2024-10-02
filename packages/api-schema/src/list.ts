import { FromSchema } from 'json-schema-to-ts';
export type ListEntry = FromSchema<typeof listEntry>;

export const listEntry = {
  $id: 'listEntry',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
} as const;

export const listResponse = {
  type: 'array',
  items: { $ref: 'listEntry' },
};
