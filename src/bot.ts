import {run} from "@grammyjs/runner";
import {bot} from "@bot/index";

if (!process.env["SCHEDULES_BOT_TOKEN"]) {
  console.info(" ⚠ BOT_TOKEN is not defined in .env.local");
  console.info("  - Telegram bot will no be launched");
} else {
  console.info("  ✉️ Telegram bot started");
  run(bot);
}