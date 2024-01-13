import {FromSchema} from "json-schema-to-ts";
import {listEntry, listQuery} from "@server/list/schema";

export type ListQuery = FromSchema<typeof listQuery>;
export type ListEntry = FromSchema<typeof listEntry>;