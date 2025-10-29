import { getRaspDate, isValidDate } from '@repo/shared/date';
import { generateSchedules } from '@repo/generators';
import { SchedulesLesson } from '@repo/api-schema/schedules';
import { cachedRequest, checkForValidContext } from './utils.js';
import Strings from './strings.js';
import { SCHEDULE_TTL } from './consts.js';
import { BotContext } from './context.js';

function formatLessons(lessons: SchedulesLesson[]) {
  let result = '';

  lessons.forEach((lesson) => {
    const time_start = lesson.time_start;
    const time_end = lesson.time_end;

    const place = lesson.additional?.is_online
      ? Strings.isOnline
      : lesson.additional?.classroom
        ? Strings.location(lesson.additional.classroom)
        : Strings.location('Незвестно');

    let groups = null;
    if (lesson.additional?.subgroup && lesson.additional.group) {
      groups = lesson.additional.subgroup
        .map((sub: string) => sub + lesson.additional!.group![0])
        .join(', ');
    }

    result += `${time_start} - ${time_end} • ${place}`;

    if (groups) {
      result += ` • ${groups}`;
    }

    result += `\n`;

    if (lesson.additional?.url) {
      result += `<a href="${lesson.additional.url}"><b>${lesson.text}</b></a>\n`;
    } else {
      result += `<b>${lesson.text}</b>\n`;
    }

    if (lesson.additional?.type) {
      result += Strings[lesson.additional.type];
    }

    if (lesson.additional?.teacher_name) {
      result += `, ${lesson.additional.teacher_name}`;
    }

    result += `\n\n`;
  });

  return result;
}

async function getForDay(
  ctx: BotContext,
  date: Date
): Promise<[SchedulesLesson[], string]> {
  checkForValidContext(ctx);

  date = new Date(date);
  date.setUTCHours(0, 0, 0, 0);
  const formattedDate = getRaspDate(date);
  const header = `<b>Расписание на ${getRaspDate(date)}</b>\n\n`;

  const cached = await cachedRequest(
    `schedules-1251-${formattedDate}-${ctx.session.group}`,
    async () => {
      return await generateSchedules({
        dateStart: formattedDate,
        dateEnd: formattedDate,
        group: ctx.session.group,
      });
    },
    SCHEDULE_TTL
  );

  if ('name' in cached) {
    return [[], Strings.error(JSON.stringify(cached))];
  }

  if (cached.length === 0) {
    return [[], Strings.noSchedules(formattedDate)];
  }

  return [cached[0].lessons, header];
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
