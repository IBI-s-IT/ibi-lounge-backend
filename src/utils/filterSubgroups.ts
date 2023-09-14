import {LessonDay} from "../types/parser";
import {Subgroup} from "../types/subgroup";

export const filterSubgroups = (lessons: LessonDay[], subgroups: Subgroup[]) => {

    const filtered_lessons = [];
    for (const date of lessons) {
        const filtered_date_lessons = [];
        for (const lesson of date.lessons) {
            if (!lesson.text.includes(', Группа ')) {
                filtered_date_lessons.push(lesson);
                continue;
            } // if the lesson doesn't have a group, add it to the filtered lessons

            const [lesson_subject, lesson_group] = lesson.text.split(', Группа ');
            const lesson_subgroup = lesson.additional?.subgroup;
            for (const subject_props of subgroups) {
                if (lesson_subject == subject_props.subject &&
                    lesson_group.includes(subject_props.group) &&
                    lesson_subgroup == subject_props.subgroup
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