import ical, { ICalAlarmType, ICalEventBusyStatus } from "ical-generator";
import { getSchedules } from "../schedules/getSchedules";
import { getRaspDate, startEndOfYear } from "../shared/date";

export async function getCalendar(query: URLSearchParams) {
  const [start, end] = startEndOfYear();
  query.set("dateStart", getRaspDate(start));
  query.set("dateEnd", getRaspDate(end));

  const data = await getSchedules(query);

  if (!("response" in data) || data.response.length === 0) {
    throw new Error("no_data");
  }

  const calendar = ical({ name: "Учёба" });

  data.response.map((day) => {
    day.lessons.map((lesson) => {
      const event = calendar.createEvent({
        start: lesson.time_start,
        end: lesson.time_end,
        summary: lesson.text,
      });

      let description = "";

      if (lesson?.additional?.type) {
        switch (lesson.additional.type) {
          case "lecture":
            description += `📖 Лекция\n`;
            break;
          case "practice":
            description += `💻 Практика\n`;
            break;
          case "project_work":
            description += `🔨 Проектная деятельность\n`;
            break;
          case "library_day":
            description += `📚 Библиотечный день\n`;
            break;
          case "subject_report":
            description += `⚠️ Зачёт\n`;
            break;
          case "exam":
            description += `🚨 Экзамен\n`;
            break;
          case "consultation":
            description += `ℹ️ Консультация`;
            break;
          case "subject_report_with_grade":
            description += `⚠️ Диф. зачёт`;
            break;
          default:
            description += `⚠️ Неизвестный тип занятия\n`;
        }
      }

      if (lesson?.additional?.is_online) {
        event.busystatus(ICalEventBusyStatus.FREE);
        const alarm = event.createAlarm();
        alarm.type(ICalAlarmType.display);
        alarm.triggerBefore(60 * 15);
        description += `🌎Онлайн занятие\n`;

        if (lesson?.additional?.url) {
          event.location(lesson.additional.url);
        }
      } else if (lesson?.additional?.location) {
        event.location(lesson.additional.location);
        description += `🗺️ Место: ${lesson.additional.location}\n`;
        const alarm = event.createAlarm();
        alarm.type(ICalAlarmType.display);
        alarm.triggerBefore(3600 * 2);
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
