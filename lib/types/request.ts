import type { Request } from "express";
import {EducationLevel} from "./schedules";
import {Group} from "./groups";

type GetGroupsRequestBody = {};
export interface GetGroupsRequestQuery {
  education_level: EducationLevel;
}
export type GetGroupsRequest = Request<{}, {}, GetGroupsRequestBody, GetGroupsRequestQuery>

interface GetSchedulesRequestBody {}
export interface GetSchedulesRequestQuery {
  group:     Group['id'];
  dateStart: string;
  dateEnd:   string;
}
export type GetSchedulesRequest = Request<{}, {}, GetSchedulesRequestBody, GetSchedulesRequestQuery>

interface GetCalendarRequestBody {}
export interface GetCalendarRequestQuery {
  group:          Group['id'];
  ignoreSubgroup: string;
}
export type GetCalendarRequest = Request<{}, {}, GetCalendarRequestBody, GetCalendarRequestQuery>