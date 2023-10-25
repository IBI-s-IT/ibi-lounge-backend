import { User } from "@grammyjs/types";
import { redisInstance } from "./index";
import slug from "slug";
import { BotContext } from "./context";
import { isAdmin } from "./admins";

export const departmentsKey = "studsBot:departments";
export function departmentDataKey(departmentName: string, key: string) {
  return `${departmentsKey}:${departmentName}:${key}`;
}

export async function getDepartments(): Promise<string[]> {
  return redisInstance.smembers(departmentsKey);
}

export async function addDepartment(
  ctx: BotContext,
  name: string,
  description: string,
) {
  if (!ctx.from || !isAdmin(ctx.from.id)) {
    throw new Error("no_access");
  }

  if (name.length === 0 || description.length === 0) {
    throw new Error("empty_name");
  }

  const newName = slug(name);
  await redisInstance.sadd(departmentsKey, newName);
  await redisInstance.set(departmentDataKey(newName, "name"), name);
  await redisInstance.set(
    departmentDataKey(newName, "description"),
    description,
  );
}

export async function getDepartmentInfo(slug: string) {
  if (!(await redisInstance.sismember(departmentsKey, slug))) {
    throw new Error("no_such_department");
  }

  const name = await redisInstance.get(departmentDataKey(slug, "name"));
  const description = await redisInstance.get(
    departmentDataKey(slug, "description"),
  );

  return {
    name,
    description,
  };
}

export async function removeDepartment(ctx: BotContext, slug: string) {
  if (!ctx.from || !isAdmin(ctx.from.id)) {
    throw new Error("no_access");
  }

  await redisInstance.srem(departmentsKey, slug);
  await redisInstance.del(departmentDataKey(slug, "name"));
  await redisInstance.del(departmentDataKey(slug, "description"));
}

export async function addUserToDepartment(
  ctx: BotContext,
  id: User["id"],
  slug: string,
) {
  if (!ctx.from || !isAdmin(ctx.from.id)) {
    throw new Error("no_access");
  }

  await redisInstance.sadd(departmentDataKey(slug, "users"), id);
}

export async function removeUserFromDepartment(
  ctx: BotContext,
  id: User["id"],
  slug: string,
) {
  if (!ctx.from || !isAdmin(ctx.from.id)) {
    throw new Error("no_access");
  }

  await redisInstance.sadd(departmentDataKey(slug, "users"), id);
}
