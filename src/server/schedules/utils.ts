import { SchedulesDay, Subgroup } from './types';
export const filterSubgroups = (
  lessons: SchedulesDay[],
  subgroups: Subgroup[]
): SchedulesDay[] => {
  const filtered_lessons: SchedulesDay[] = [];

  for (const date of lessons) {
    const { lessons, ...rest } = date;
    const filtered_date_lessons = [];

    for (const lesson of date.lessons) {
      if (!lesson.additional?.subgroup) {
        filtered_date_lessons.push(lesson);
        continue;
      }

      for (const subject_props of subgroups) {
        if (
          lesson.text === subject_props.subject &&
          lesson.additional.group?.includes(subject_props.group) &&
          lesson.additional.subgroup?.includes(subject_props.subgroup)
        ) {
          filtered_date_lessons.push(lesson);
        }
      }
    }

    filtered_lessons.push({
      ...rest,
      lessons: filtered_date_lessons,
    });
  }

  return filtered_lessons;
};
