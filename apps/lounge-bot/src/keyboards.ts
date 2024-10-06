import Strings from './strings.js';
import { Menu } from '@grammyjs/menu';
import { checkForValidContext } from './utils.js';
import { getCustom, getToday, getTomorrow } from './commands.js';
import { BotContext } from './context.js';

const SettingsKeyboard = new Menu<BotContext>('settings').back(
  Strings.back,
  async (ctx) =>
    await ctx.editMessageText(Strings.greeting(ctx), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
);

const GoBackKeyboard = new Menu<BotContext>('goback').back(
  Strings.back,
  async (ctx) =>
    await ctx.editMessageText(Strings.greeting(ctx), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })
);

const DaysKeyboard = new Menu<BotContext>('daily')
  .text(Strings.backwards, async (ctx) => {
    checkForValidContext(ctx);
    const date = new Date(ctx.session.customDate);

    const dayBefore = new Date(
      new Date(ctx.session.customDate).setDate(date.getDate() - 1)
    );

    ctx.session.customDate = dayBefore.toString();
    await ctx.editMessageText(await getCustom(ctx, dayBefore), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  })
  .text(Strings.toToday, async (ctx) => {
    checkForValidContext(ctx);
    ctx.session.customDate = new Date().toString();
    await ctx.editMessageText(await getCustom(ctx, new Date()), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  })
  .text(Strings.forward, async (ctx) => {
    checkForValidContext(ctx);
    const date = new Date(ctx.session.customDate);

    const dayAfter = new Date(
      new Date(ctx.session.customDate).setDate(date.getDate() + 1)
    );

    ctx.session.customDate = dayAfter.toString();
    await ctx.editMessageText(await getCustom(ctx, dayAfter), {
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    });
  })
  .row()
  .back(
    Strings.back,
    async (ctx) =>
      await ctx.editMessageText(Strings.greeting(ctx), {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      })
  );

const LinksMenu = new Menu<BotContext>('links')
  .url(Strings.lms, 'https://lms.ibispb.ru')
  .url(Strings.news, 'https://ibispb.ru/news/')
  .row()
  .url(Strings.employees, 'https://ibispb.ru/sveden/employees/')
  .row()
  .url(Strings.contacts, 'https://ibispb.ru/contacts/')
  .row()
  .url(Strings.iosApp, 'https://apps.apple.com/ru/app/ibi-lounge/id6459472308')
  .back(Strings.back);

const IndexMenu = new Menu<BotContext>('index')
  .text(
    Strings.today,
    async (ctx) =>
      await ctx.editMessageText(await getToday(ctx), {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: GoBackKeyboard,
      })
  )
  .text(
    Strings.tomorrow,
    async (ctx) =>
      await ctx.editMessageText(await getTomorrow(ctx), {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        reply_markup: GoBackKeyboard,
      })
  )
  .submenu(Strings.days, 'daily', async (ctx) => {
    await ctx.editMessageText(
      await getCustom(ctx, new Date(ctx.session.customDate)),
      {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }
    );
  })
  .row()
  .submenu(Strings.links, 'links')
  .submenu(
    Strings.settings,
    'settings',
    async (ctx) =>
      await ctx.editMessageText(Strings.settingsMenu(ctx), {
        parse_mode: 'HTML',
      })
  );

export { IndexMenu, LinksMenu, DaysKeyboard, SettingsKeyboard, GoBackKeyboard };
