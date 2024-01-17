import { errorsSchema } from '@shared/errors';

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
