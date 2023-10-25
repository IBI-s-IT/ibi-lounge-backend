import { Bot, session } from "grammy";
import { BotContext, ConvType, UserRoles } from "./context";
import Redis from "ioredis";
import { RedisAdapter } from "@grammyjs/storage-redis";
import { run } from "@grammyjs/runner";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { autoRetry } from "@grammyjs/auto-retry";
import { addAdmin, getAdmins, isAdmin, rmAdmin } from "./admins";

export const redisInstance = new Redis();
const storage = new RedisAdapter({ instance: redisInstance });

const bot = new Bot<BotContext>(process.env["STUD_BOT_TOKEN"]);

const throttler = apiThrottler();

bot.api.config.use(throttler);
bot.api.config.use(autoRetry());

bot.use(
  session({
    storage,
    initial: () => ({
      role: UserRoles.NORMAL,
      respondMode: ConvType.NORMAL,
    }),
    getSessionKey: (ctx) => {
      return `studsbot_${ctx.chat?.id}`;
    },
  }),
);

bot.catch(console.error);

bot.command("start", async (ctx) => {
  if (ctx.from) {
    const isAdm = await isAdmin(ctx.from.id);
    ctx.session.role = isAdm ? UserRoles.ADMIN : UserRoles.NORMAL;
  }
  console.log(ctx.session.role);
});

bot.command("get_admins", async (ctx) => {
  try {
    const admins = await getAdmins(ctx);
    ctx.reply(
      `Привелегированные: <code>${admins.join("</code>, <code>")}</code>`,
      {
        parse_mode: "HTML",
      },
    );
  } catch (e) {
    ctx.reply(`⚠️ Ошибка: ${e}`);
  }
});
bot.command("add_admin", async (ctx) => {
  try {
    const id = Number(ctx.message.text.split(" ")[1]);
    if (isNaN(id) || !(await isAdmin(ctx.from.id)) || (await isAdmin(id))) {
      ctx.reply(`⚠️ Неверная команда`);
      return;
    }

    await addAdmin(ctx, id);
    ctx.reply("Успешно!");
  } catch (e) {
    ctx.reply(`⚠️ Ошибка: ${e}`);
  }
});
bot.command("rm_admin", async (ctx) => {
  try {
    const id = Number(ctx.message.text.split(" ")[1]);
    if (isNaN(id) || !(await isAdmin(ctx.from.id)) || !(await isAdmin(id))) {
      ctx.reply(`⚠️ Неверная команда`);
      return;
    }

    await rmAdmin(ctx, id);
    ctx.reply("Успешно!");
  } catch (e) {
    ctx.reply(`⚠️ Ошибка: ${e}`);
  }
});

bot.command("add_department", async (ctx) => {});
bot.command("rm_department", async (ctx) => {});
bot.command("add_user_to_department", async (ctx) => {});
bot.command("rm_user_from_department", async (ctx) => {});

bot.on("message", async (ctx) => {
  switch (ctx.session.respondMode) {
    case ConvType.MESSAGE:
      break;
    case ConvType.DEP_NAME:
      break;
    case ConvType.DEP_DESC:
      break;
    case ConvType.DEP_PHOTO_URL:
      break;
    default:
      ctx.reply("?");
  }
});

run(bot);
