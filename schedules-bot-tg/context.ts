import { Context, SessionFlavor } from "grammy";

export interface SessionData {
  levelId?: string;
  levelName?: string;
  groupId?: string;
  groupName?: string;

  customDate?: string;
}

export type BotContext = Context & SessionFlavor<SessionData>;
