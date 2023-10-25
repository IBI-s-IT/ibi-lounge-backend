export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (!process.env["SCHEDULES_BOT_TOKEN"]) {
      console.info(" ⚠ SCHEDULES_BOT_TOKEN is not defined in .env.production");
      console.info("  - Schedules bot will no be launched");
    } else {
      console.info("  ✉️ Telegram bot started");
      await import("./schedules-bot-tg/index");
    }

    if (!process.env["STUD_BOT_TOKEN"]) {
      console.info(" ⚠ STUD_BOT_TOKEN is not defined in .env.production");
      console.info("  - Telegram bot will no be launched");
    } else {
      console.info("  ✉️ Telegram bot started");
      await import("./studs-bot-tg/index");
    }
  }
}
