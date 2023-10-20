import { BotContext } from "./context";
import { cachedRequest, getSpecialDate, getTimeFromDate } from "./utils";
import { getSchedules } from "../app/api/schedules/getSchedules";
import Strings from "./strings";
import { Lesson, LessonDay } from "../app/api/schedules/types";
import { SCHEDULE_TTL } from "./consts";

function isValidDate(d) {
  // @ts-ignore хаки
  return d instanceof Date && !isNaN(d);
}

function formatLessons(lessons: Lesson[]) {
  let result = "";

  lessons.forEach((lesson) => {
    const time_start =
      lesson.additional?.custom_time?.start ?? lesson.time_start;
    const time_end = lesson.additional?.custom_time?.end ?? lesson.time_end;
    const place = lesson.additional?.is_online
      ? Strings.isOnline
      : lesson.additional.location
      ? Strings.location(lesson.additional.location)
      : Strings.location("Незвестно");

    result += `${getTimeFromDate(time_start)} - ${getTimeFromDate(
      time_end,
    )} • ${place}\n`;

    if (lesson.additional.url) {
      result += `<a href="${lesson.additional.url}"><b>${lesson.text}</b></a>\n`;
    } else {
      result += `<b>${lesson.text}</b>\n`;
    }

    if (lesson.additional.type) {
      result += `${Strings[lesson.additional.type]}`;
    }

    if (lesson.additional.teacher_name) {
      result += `, ${lesson.additional.teacher_name}`;
    }

    result += `\n\n`;
  });

  return result;
}

async function getForDay(
  ctx: BotContext,
  date: Date,
): Promise<[Lesson[], string]> {
  date = new Date(date);
  date.setUTCHours(0, 0, 0, 0);
  const formattedDate = getSpecialDate(date);
  const cached = await cachedRequest(
    `schedules-${formattedDate}-${ctx.session.groupId}`,
    async () => {
      const search = new URLSearchParams();
      search.append("dateStart", formattedDate);
      search.append("dateTo", formattedDate);
      search.append("group", ctx.session.groupId);

      return await getSchedules(search);
    },
    SCHEDULE_TTL,
  );

  if ("error" in cached) {
    switch (cached.error) {
      case "no_schedules":
        return [[], Strings.noSchedules(formattedDate)];
      default:
        return [[], Strings.error(cached.error)];
    }
  }

  const header = `<b>Расписание на ${formattedDate}</b>\n\n`;

  return [cached.response[0].lessons, header];
}

export async function getToday(ctx: BotContext) {
  const [lessons, header] = await getForDay(ctx, new Date());

  return `${header}${formatLessons(lessons)}`;
}

export async function getTomorrow(ctx: BotContext) {
  const date = new Date();
  date.setDate(new Date().getDate() + 1);
  const [lessons, header] = await getForDay(ctx, new Date(date));

  return `${header}${formatLessons(lessons)}`;
}

export async function getCustom(ctx: BotContext, date: Date) {
  if (!date || !isValidDate(date)) {
    date = new Date();
    ctx.session.customDate = date.toString();
  }

  const [lessons, header] = await getForDay(ctx, new Date(date));

  return `${header}${formatLessons(lessons)}`;
}
