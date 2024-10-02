import { FromSchema } from 'json-schema-to-ts';

export type BotValidateQuery = FromSchema<typeof botValidateQuery>;

export const botValidateQuery = {
  type: 'object',
  properties: {
    init: { type: 'string', minLength: 5 },
  },
  required: ['init'],
} as const;

export const botValidateRequestSchema = {
  description: 'Проверяет initData в мини-приложении Telegram',
  querystring: botValidateQuery,
};

export const botValidateResponse = {
  type: 'boolean',
};

export const botValidateSchema = {
  ...botValidateRequestSchema,
  tags: ['Мини-приложение'],
  response: {
    200: botValidateResponse,
  },
};

export const botSettingsQuery = {
  type: 'object',
  properties: {
    init: { type: 'string', minLength: 5 },
    group: { type: 'string' },
    level: { type: 'string' },
  },
  required: ['init', 'group', 'level'],
} as const;

export type BotSettingsQuery = FromSchema<typeof botSettingsQuery>;

export const botSettingsRequestSchema = {
  description: 'Устанавливает настройки для чат-бота, проверяет initData',
  querystring: botSettingsQuery,
};

export const botSettingsResponse = {
  type: 'object',
  properties: {
    response: {
      type: 'boolean',
    },
  },
} as const;

export type BotSettingsResponse = FromSchema<typeof botSettingsResponse>;

export const botSettingsSchema = {
  ...botSettingsRequestSchema,
  tags: ['Мини-приложение'],
  response: {
    200: botSettingsResponse,
  },
};
