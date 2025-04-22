import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { errorsSchema } from './errors.js';

export type LinkItem = FromSchema<typeof linkItem>;
export type SectionItem = FromSchema<
  typeof sectionItem,
  { references: [typeof linkItem] }
>;
export type LinksResponse = FromSchema<
  typeof linksResponse,
  {
    references: [typeof sectionItem | typeof linkItem];
  }
>;

export const linksQuery = {
  type: 'object',
  properties: {},
} as const satisfies JSONSchema;

const linksRequest = {
  description: 'Выдаёт список ссылок главной страницы',
  querystring: linksQuery,
};

export const linkItem = {
  $id: 'LinkItem',
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'Текст ссылки',
    },
    href: {
      type: 'string',
      description: 'URL ссылки',
    },
  },
  required: ['text', 'href'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export const sectionItem = {
  $id: 'SectionItem',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Заголовок секции, null если это блок вне заголовков',
    },
    links: {
      type: 'array',
      items: { $ref: 'LinkItem' },
      description: 'Список ссылок в данной секции',
    },
  },
  required: ['title', 'links'],
  additionalProperties: false,
} as const satisfies JSONSchema;

export const linksResponse = {
  type: 'array',
  items: { $ref: 'SectionItem' },
} as const satisfies JSONSchema;

export const linksSchema = {
  ...linksRequest,
  tags: ['Списки'],
  response: {
    200: linksResponse,
    ...errorsSchema,
  },
};
