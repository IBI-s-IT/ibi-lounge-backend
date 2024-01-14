import { Bot, session } from 'grammy';
import { BotContext } from './context';
import Redis from 'ioredis';
import { RedisAdapter } from '@grammyjs/storage-redis';
import {
  DaysKeyboard,
  GroupKeyboard,
  IndexMenu,
  LevelKeyboard,
  LinksMenu,
  SettingsKeyboard,
} from './keyboards';
import Strings from './strings';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import { autoRetry } from '@grammyjs/auto-retry';
import { getCustom, getToday, getTomorrow } from './commands';
import { BOT_DEFAULT_SESSION } from '@bot/consts';
import { logger } from '@bot/logger';

// Storage initialization
export const redisInstance = new Redis();
const storage = new RedisAdapter({ instance: redisInstance });

export const bot = new Bot<BotContext>(process.env['BOT_TOKEN'] ?? '');

// Menus
const menu = IndexMenu;
menu.register(LinksMenu);
menu.register(DaysKeyboard);
menu.register(SettingsKeyboard);
menu.register(LevelKeyboard, 'settings');
menu.register(GroupKeyboard, 'settings');

const throttler = apiThrottler();

bot.api.config.use(throttler);
bot.api.config.use(autoRetry());

bot.use(
  session({
    storage,
    initial: () => BOT_DEFAULT_SESSION,
    getSessionKey: (ctx) => {
      return `schedules_bot${ctx.chat?.id}`;
    },
  })
);

bot.use(menu);

// MARK: Bot commands
bot.command('start', (ctx) =>
  ctx.reply(Strings.greeting(ctx), {
    reply_markup: IndexMenu,
    parse_mode: 'HTML',
  })
);

bot.command(
  'today',
  async (ctx) =>
    await ctx.reply(await getToday(ctx), {
      parse_mode: 'HTML',
    })
);

bot.command(
  'tomorrow',
  async (ctx) =>
    await ctx.reply(await getTomorrow(ctx), {
      parse_mode: 'HTML',
    })
);

bot.command(
  'daily',
  async (ctx) =>
    await ctx.reply(await getCustom(ctx, new Date(ctx.session.customDate)), {
      reply_markup: DaysKeyboard,
      parse_mode: 'HTML',
    })
);

bot.command(
  'links',
  async (ctx) =>
    await ctx.reply(Strings.links, {
      reply_markup: LinksMenu,
      parse_mode: 'HTML',
    })
);

bot.command(
  'settings',
  async (ctx) =>
    await ctx.reply(Strings.settingsMenu(ctx), {
      reply_markup: SettingsKeyboard,
      parse_mode: 'HTML',
    })
);

void bot.api.setMyCommands([
  { command: 'start', description: Strings.startDesc },
  { command: 'today', description: Strings.todayDesc },
  { command: 'tomorrow', description: Strings.tomorrowDesc },
  { command: 'daily', description: Strings.dailyDesc },
  { command: 'links', description: Strings.linksDesc },
  { command: 'settings', description: Strings.settingsDesc },
]);

bot.catch(logger.error);
