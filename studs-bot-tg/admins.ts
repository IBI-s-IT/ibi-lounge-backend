import { redisInstance } from "./index";
import { BotContext } from "./context";
import { User } from "@grammyjs/types";
import { red } from "next/dist/lib/picocolors";

const adminKey = "studsBot:admins";

export async function addAdmin(ctx: BotContext, id: number) {
  if (!ctx.from || !(await isAdmin(ctx.from.id))) {
    throw new Error("no_access");
  }

  await redisInstance.sadd(adminKey, id);
}

export async function rmAdmin(ctx: BotContext, id: number) {
  if (!ctx.from || !(await isAdmin(ctx.from.id))) {
    throw new Error("no_access");
  }

  await redisInstance.srem(adminKey, id);
}

export async function isAdmin(id: User["id"]) {
  if ((await redisInstance.scard(adminKey)) === 0) {
    await redisInstance.sadd(adminKey, id);
  }

  return (await redisInstance.sismember(adminKey, id)) === 1;
}

export async function getAdmins(ctx: BotContext) {
  if (!ctx.from || !(await isAdmin(ctx.from.id))) {
    throw new Error("no_access");
  }

  return redisInstance.smembers(adminKey);
}
