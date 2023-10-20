export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    if (!process.env["SCHEDULES_BOT_TOKEN"]) {
      console.info(" ⚠ BOT_TOKEN is not defined in .env.local");
      console.info("  - Telegram bot will no be launched");
    } else {
      console.info("  ✉️ Telegram bot started");
      await import("./schedules-bot-tg/index");
    }
  }
}
