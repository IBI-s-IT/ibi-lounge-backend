export const calendarQuery = {
  type: 'object',
  properties: {
    group: { type: 'string' },
  },
  required: ['group'],
} as const;

const calendarRequestSchema = {
  description:
    'Выдаёт расписание группы в виде ical-календаря, который в последствии можно импортировать в календарный сервис',
  querystring: calendarQuery,
};

const calendarResponseSchema = {
  type: 'string',
  contentMediaType: 'text/calendar',
};

export const calendarSchema = {
  ...calendarRequestSchema,
  response: {
    200: calendarResponseSchema,
  },
};
