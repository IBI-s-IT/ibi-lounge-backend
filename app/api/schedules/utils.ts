import {LessonDay, Subgroup} from "./types";
export const filterSubgroups = (lessons: LessonDay[], subgroups: Subgroup[]): LessonDay[] => {

  const filtered_lessons = [];
  for (const date of lessons) {
    const filtered_date_lessons = [];
    for (const lesson of date.lessons) {
      if (!lesson.additional?.subgroup) {
        filtered_date_lessons.push(lesson);
        continue;
      }
      for (const subject_props of subgroups) {
        if (lesson.text === subject_props.subject &&
          lesson.additional.group?.includes(subject_props.group) &&
          lesson.additional.subgroup?.includes(subject_props.subgroup)
        ) {
          filtered_date_lessons.push(lesson);
        }
      }
    }
    filtered_lessons.push({
      date: date.date,
      lessons: filtered_date_lessons
    });

  }
  return filtered_lessons;
}