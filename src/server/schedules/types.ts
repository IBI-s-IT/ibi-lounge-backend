import { FromSchema } from 'json-schema-to-ts';
import { calendarQuery } from '@server/schedules/schemas/calendar';
import {
  schedulesDay,
  lesson,
  lessonAdditional,
  schedulesQuery,
} from '@server/schedules/schemas/schedules';

export type SchedulesQuery = FromSchema<typeof schedulesQuery>;
export type SchedulesDay = FromSchema<typeof schedulesDay>;
export type SchedulesLesson = FromSchema<typeof lesson>;
export type SchedulesLessonAdditional = FromSchema<typeof lessonAdditional>;

export type CalendarQuery = FromSchema<typeof calendarQuery>;
