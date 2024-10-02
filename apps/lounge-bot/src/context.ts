import { Context, SessionFlavor } from 'grammy';
import { SessionData } from '@repo/shared';

export type BotContext = Context & SessionFlavor<SessionData>;
