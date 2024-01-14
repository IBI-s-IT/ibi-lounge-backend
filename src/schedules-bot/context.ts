import { Context, SessionFlavor } from 'grammy';

export interface SessionData {
  education_level: string;
  levelName: string;
  group: string;
  groupName: string;
  customDate: string;
}

export type BotContext = Context & SessionFlavor<SessionData>;
