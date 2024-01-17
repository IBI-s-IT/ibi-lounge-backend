import { FromSchema } from 'json-schema-to-ts';

import {
  schedulesDay,
  lesson,
  lessonAdditional,
  schedulesQuery,
} from '@server/schedules/schema';

export type SchedulesQuery = FromSchema<typeof schedulesQuery>;
export type SchedulesDay = FromSchema<typeof schedulesDay>;
export type SchedulesLesson = FromSchema<typeof lesson>;
export type SchedulesLessonAdditional = FromSchema<typeof lessonAdditional>;
