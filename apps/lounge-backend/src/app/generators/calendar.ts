import iCalCalendar, {
  ICalAlarmType,
  ICalEventBusyStatus,
} from 'ical-generator';
import { generateSchedules as schedulesGenerator } from '@repo/generators';
import { getRaspDate, calendarSpecificDates } from '@repo/shared/date';
import { lessonTypeMap } from '@repo/shared/lesson_type_map';
import { CalendarQuery } from '@repo/api-schema/calendar';

export async function calendarGenerator(query: CalendarQuery) {
  const [start, end] = calendarSpecificDates();
  const schedulesQuery = {
    dateStart: getRaspDate(start),
    dateEnd: getRaspDate(end),
    ...query,
  };

  const data = await schedulesGenerator(schedulesQuery);

  const calendar = iCalCalendar({ name: 'Учёба' });

  if ('name' in data) {
    return data;
  }

  data.map((day) => {
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
        description += `${lessonTypeMap[lesson.additional.type]}\n`;
      }

      if (lesson?.additional?.teacher_groups) {
        description += `Группы: ${lesson.additional.teacher_groups.join(',')}`;
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
        description += `🗺️ Место: ${lesson.additional.classroom}\n`;
        event.createAlarm({
          type: ICalAlarmType.display,
          trigger: 3600 * 2,
        });
      }

      if (
        !lesson?.additional?.teacher_groups &&
        lesson?.additional?.subgroup?.length &&
        lesson?.additional?.group?.length
      ) {
        description += `👥 Подгруппа: ${lesson.additional.subgroup.map(
          (sub) => `${sub}${lesson!.additional!.group![0]}`
        )}\n`;
      }

      if (lesson?.additional?.teacher_name) {
        description += `👩‍🏫 Преподаватель: ${lesson.additional.teacher_name}`;
      }

      event.description(description);
    });
  });

  return calendar.toString();
}
