import { FromSchema } from 'json-schema-to-ts';
import { calendarQuery } from '@server/calendar/schema';

export type CalendarQuery = FromSchema<typeof calendarQuery>;
