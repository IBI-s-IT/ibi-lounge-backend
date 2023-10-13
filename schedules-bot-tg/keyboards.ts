import Strings from "./strings";
import { Menu, MenuRange } from "@grammyjs/menu";
import { BotContext } from "./context";
import { getLevels } from "../app/api/levels/getLevels";
import { cachedRequest } from "./utils";
import { getGroups } from "../app/api/groups/getGroups";
import { getCustom, getToday, getTomorrow } from "./commands";
import { GROUPS_TTL, LEVELS_TTL } from "./consts";

const LevelKeyboard = new Menu<BotContext>("levelSelect")
  .dynamic(async (ctx) => {
    const range = new MenuRange<BotContext>();
    const cached = await cachedRequest(
      "levels",
      async () => {
        return await getLevels();
      },
      LEVELS_TTL,
    );

    if (!("response" in cached)) {
      await ctx.reply("Произошла ошибка запроса");
      console.error("Hard error while getting levels");
      return range;
    }

    if (!ctx.session.levelId) {
      ctx.session.levelId = "1";
    }

    cached.response.forEach((level) => {
      const nameText = `${level.id === ctx.session.levelId ? "✅" : ""} ${
        level.name
      }`;

      range
        .text(nameText, async (ctx) => {
          ctx.session.levelId = level.id;
          ctx.session.levelName = level.name;
          await ctx.editMessageText(Strings.settingsMenu(ctx), {
            parse_mode: "HTML",
          });
          ctx.menu.back();
        })
        .row();
    });
    return range;
  })
  .back(
    Strings.back,
    async (ctx) =>
      await ctx.editMessageText(Strings.settingsMenu(ctx), {
        parse_mode: "HTML",
      }),
  );

const GroupKeyboard = new Menu<BotContext>("groupSelect")
  .dynamic(async (ctx) => {
    const range = new MenuRange<BotContext>();

    const cached = await cachedRequest(
      `groups-level-${ctx.session.levelId ?? "1"}`,
      async () => {
        const search = new URLSearchParams();
        search.append("level_id", ctx.session.levelId ?? "1");

        return await getGroups(search);
      },
      GROUPS_TTL,
    );

    if (!("response" in cached)) {
      await ctx.reply("Произошла ошибка запроса");
      console.error("Hard error while getting groups");
      return range;
    }

    const chunkSize = 3;
    for (let i = 0; i < cached.response.length; i += chunkSize) {
      const chunk = cached.response.slice(i, i + chunkSize);
      chunk.forEach((group) => {
        const nameText = `${group.id === ctx.session.groupId ? "✅" : ""} ${
          group.name
        }`;
        range.text(nameText, async (ctx) => {
          ctx.session.groupName = group.name;
          ctx.session.groupId = group.id;
          await ctx.editMessageText(Strings.settingsMenu(ctx), {
            parse_mode: "HTML",
          });
          ctx.menu.back();
        });
      });
      range.row();
    }

    return range;
  })
  .back(
    Strings.back,
    async (ctx) =>
      await ctx.editMessageText(Strings.settingsMenu(ctx), {
        parse_mode: "HTML",
      }),
  );

const SettingsKeyboard = new Menu<BotContext>("settings")
  .submenu(Strings.eduLevel, "levelSelect", (ctx) =>
    ctx.editMessageText(Strings.eduLevelMenu, { parse_mode: "HTML" }),
  )
  .row()
  .submenu(Strings.group, "groupSelect", (ctx) =>
    ctx.editMessageText(Strings.groupMenu, { parse_mode: "HTML" }),
  )
  .row()
  .back(
    Strings.back,
    async (ctx) =>
      await ctx.editMessageText(Strings.greeting(ctx), { parse_mode: "HTML" }),
  );

const DaysKeyboard = new Menu<BotContext>("daily")
  .text(Strings.backwards, async (ctx) => {
    const date = new Date(ctx.session.customDate);

    const dayBefore = new Date(
      new Date(ctx.session.customDate).setDate(date.getDate() - 1),
    );

    ctx.session.customDate = dayBefore.toString();
    await ctx.editMessageText(await getCustom(ctx, dayBefore), {
      parse_mode: "HTML",
    });
  })
  .text(Strings.toToday, async (ctx) => {
    ctx.session.customDate = new Date().toString();
    await ctx.editMessageText(await getCustom(ctx, new Date()), {
      parse_mode: "HTML",
    });
  })
  .text(Strings.forward, async (ctx) => {
    const date = new Date(ctx.session.customDate);

    const dayAfter = new Date(
      new Date(ctx.session.customDate).setDate(date.getDate() + 1),
    );

    ctx.session.customDate = dayAfter.toString();
    await ctx.editMessageText(await getCustom(ctx, dayAfter), {
      parse_mode: "HTML",
    });
  })
  .row()
  .back(
    Strings.back,
    async (ctx) =>
      await ctx.editMessageText(Strings.greeting(ctx), { parse_mode: "HTML" }),
  );

const LinksMenu = new Menu<BotContext>("links")
  .url(Strings.lms, "https://lms.ibispb.ru")
  .url(Strings.news, "https://ibispb.ru/news/")
  .row()
  .url(Strings.employees, "https://ibispb.ru/sveden/employees/")
  .row()
  .url(Strings.contacts, "https://ibispb.ru/contacts/")
  .back(Strings.back);

const IndexMenu = new Menu<BotContext>("index")
  .text(
    Strings.today,
    async (ctx) =>
      await ctx.editMessageText(await getToday(ctx), { parse_mode: "HTML" }),
  )
  .text(
    Strings.tomorrow,
    async (ctx) =>
      await ctx.editMessageText(await getTomorrow(ctx), { parse_mode: "HTML" }),
  )
  .submenu(Strings.days, "daily", async (ctx) => {
    await ctx.editMessageText(
      await getCustom(ctx, new Date(ctx.session.customDate)),
      {
        parse_mode: "HTML",
      },
    );
  })
  .row()
  .submenu(Strings.links, "links")
  .submenu(
    Strings.settings,
    "settings",
    async (ctx) =>
      await ctx.editMessageText(Strings.settingsMenu(ctx), {
        parse_mode: "HTML",
      }),
  );

export {
  IndexMenu,
  LinksMenu,
  DaysKeyboard,
  SettingsKeyboard,
  GroupKeyboard,
  LevelKeyboard,
};
