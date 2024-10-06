import { errorsSchema } from './errors.js';
import { FromSchema } from 'json-schema-to-ts';

export type CalendarQuery = FromSchema<typeof calendarQuery>;

export const calendarQuery = {
  type: 'object',
  properties: {
    group: { type: 'string' },
    teacher: { type: 'string' },
  },
  anyOf: [
    {
      required: ['group'],
    },
    {
      required: ['teacher'],
    },
  ],
} as const;

const calendarRequestSchema = {
  description: 'Выдаёт расписание группы или преподавателя в iCal формате',
  querystring: calendarQuery,
};

const calendarResponseSchema = {
  description: 'test',
  content: { 'text/calendar': { schema: { type: 'string' } } },
};

export const calendarSchema = {
  ...calendarRequestSchema,
  tags: ['Расписание'],
  response: {
    200: calendarResponseSchema,
    ...errorsSchema,
  },
};
