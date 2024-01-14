import { BotContext } from './context';
import { cachedRequest, checkForValidContext } from './utils';
import { getSchedules } from '@server/schedules/getSchedules';
import Strings from './strings';
import { SchedulesLesson } from '@server/schedules/types';
import { SCHEDULE_TTL } from './consts';
import { getRaspDate } from '@shared//date';

function isValidDate(d: unknown) {
  // @ts-ignore хаки
  return d instanceof Date && !isNaN(d);
}

function formatLessons(lessons: SchedulesLesson[]) {
  let result = '';

  lessons.forEach((lesson) => {
    const time_start = lesson.time_start;
    const time_end = lesson.time_end;

    const place = lesson.additional?.is_online
      ? Strings.isOnline
      : lesson.additional?.location
        ? Strings.location(lesson.additional.location)
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

  try {
    const cached = await cachedRequest(
      `schedules-${formattedDate}-${ctx.session.group}`,
      async () => {
        return await getSchedules({
          dateStart: formattedDate,
          dateEnd: formattedDate,
          group: ctx.session.group,
        });
      },
      SCHEDULE_TTL
    );

    return [cached.response[0].lessons, header];
  } catch (error) {
    switch ((error as Error).message) {
      case 'no_schedules':
        return [[], Strings.noSchedules(formattedDate)];
      default:
        return [[], Strings.error((error as Error).message!)];
    }
  }
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
