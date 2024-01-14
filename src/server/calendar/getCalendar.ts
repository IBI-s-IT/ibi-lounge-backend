import ical, { ICalAlarmType, ICalEventBusyStatus } from 'ical-generator';
import { getSchedules } from '../schedules/getSchedules';
import { getRaspDate, startEndOfYear } from '@shared/date';
import { CalendarQuery } from '@server/calendar/types';
import Strings from '@bot/strings';

export async function getCalendar(query: CalendarQuery) {
  const [start, end] = startEndOfYear();
  const schedulesQuery = {
    dateStart: getRaspDate(start),
    dateEnd: getRaspDate(end),
    group: query.group,
  };

  const data = await getSchedules(schedulesQuery);

  if (!('response' in data) || data.response.length === 0) {
    throw new Error('no_data');
  }

  const calendar = ical({ name: 'Учёба' });

  data.response.map((day) => {
    day.lessons.map((lesson) => {
      const event = calendar.createEvent({
        start: new Date(
          start.getFullYear(),
          Number(day.month) - 1,
          Number(day.day),
          Number(lesson.time_start.split(':')[0]),
          Number(lesson.time_start.split(':')[1])
        ),
        end: new Date(
          start.getFullYear(),
          Number(day.month) - 1,
          Number(day.day),
          Number(lesson.time_end.split(':')[0]),
          Number(lesson.time_end.split(':')[1])
        ),
        summary: lesson.text,
      });

      let description = '';

      if (lesson?.additional?.type) {
        description += `${Strings[lesson.additional.type]}\n`;
      }

      if (lesson?.additional?.is_online) {
        event.busystatus(ICalEventBusyStatus.FREE);
        event.createAlarm({
          type: ICalAlarmType.display,
          trigger: 60 * 15,
        });
        description += `🌎Онлайн занятие\n`;

        if (lesson?.additional?.url) {
          event.location(lesson.additional.url);
        }
      } else if (lesson?.additional?.classroom) {
        event.location({
          title: lesson.additional.classroom,
          address: lesson.additional.classroom_details!.address,
        });
        description += `🗺️ Место: ${lesson.additional.location}\n`;
        event.createAlarm({
          type: ICalAlarmType.display,
          trigger: 3600 * 2,
        });
      }

      if (lesson?.additional?.subgroup) {
        description += `👥 Подгруппа: ${lesson.additional.subgroup}\n`;
      }

      if (lesson?.additional?.teacher_name) {
        description += `👩‍🏫 Преподаватель: ${lesson.additional.teacher_name}`;
      }

      event.description(description);
    });
  });

  return calendar.toString();
}
