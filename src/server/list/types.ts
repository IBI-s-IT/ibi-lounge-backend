import { FromSchema } from 'json-schema-to-ts';
import { listEntry } from '@server/list/schemas/response';
import { groupsQuery } from '@server/list/schemas/groups';

export type GroupsQuery = FromSchema<typeof groupsQuery>;
export type ListEntry = FromSchema<typeof listEntry>;
