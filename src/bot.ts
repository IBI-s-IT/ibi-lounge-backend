import * as process from "process";
import {run} from "@grammyjs/runner";
import {bot} from "@bot/index";
import {logger} from "@bot/logger";

if (!process.env["BOT_TOKEN"]) {
  logger.info("BOT_TOKEN is not defined in .env");
  logger.warn("Telegram bot will no be launched");
} else {
  logger.warn(`Telegram bot started`)
  run(bot);
}