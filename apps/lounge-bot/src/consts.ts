import { BotContext } from './context';

export const SCHEDULE_TTL = 3600;
export const GROUPS_TTL = 3600 * 24 * 3;
export const LEVELS_TTL = 3600 * 24 * 30;

export const BOT_DEFAULT_SESSION: BotContext['session'] = {
  groupName: '113-ПИвЭ',
  group: '2352',
  education_level: '1',
  levelName: 'бакалавриат',
  customDate: new Date().toString(),
};
