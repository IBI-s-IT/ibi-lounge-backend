import { Context, SessionFlavor } from "grammy";

export enum ConvType {
  NORMAL,
  MESSAGE,
  DEP_NAME,
  DEP_DESC,
  DEP_PHOTO_URL,
}

export enum UserRoles {
  NORMAL,
  ADMIN,
}

export interface SessionData {
  role: UserRoles;
  respondMode: ConvType;
}

export type BotContext = Context & SessionFlavor<SessionData>;
