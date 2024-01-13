import {FromSchema} from "json-schema-to-ts";

import {
  schedulesDay,
  schedulesLesson,
  schedulesLessonAdditional,
  schedulesRequestQuery
} from "@server/schedules/schema";

export type SchedulesQuery = FromSchema<typeof schedulesRequestQuery>;
export type SchedulesDay = FromSchema<typeof schedulesDay>;
export type SchedulesLesson = FromSchema<typeof schedulesLesson>;
export type SchedulesLessonAdditional = FromSchema<typeof schedulesLessonAdditional>;

export interface Subgroup {
  subject:  string;
  group:    string;
  subgroup: string;
}