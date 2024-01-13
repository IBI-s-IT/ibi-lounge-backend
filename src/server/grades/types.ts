// Request
import {FromSchema} from "json-schema-to-ts";
import {gradesGrade, gradesQuery} from "@server/grades/schema";

export type GradesQuery = FromSchema<typeof gradesQuery>;

// Response
export type Grade = FromSchema<typeof gradesGrade>;