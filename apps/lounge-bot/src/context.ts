import { Context, SessionFlavor } from 'grammy';
import { SessionData } from '@repo/shared/bot_session';

export type BotContext = Context & SessionFlavor<SessionData>;
