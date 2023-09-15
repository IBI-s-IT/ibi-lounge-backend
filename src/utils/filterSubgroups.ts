import {LessonDay} from "../types/parser";
import {Subgroup} from "../types/subgroup";

export const filterSubgroups = (lessons: LessonDay[], subgroups: Subgroup[]) => {

    const filteredLessons = [];
    for (const date of lessons) {
        const filteredDateLessons = [];
        for (const lesson of date.lessons) {
            if (!lesson.additional?.subgroup) {
                filteredDateLessons.push(lesson);
                continue;
            }
            for (const subject_props of subgroups) {
                if (lesson.text === subject_props.subject &&
                    lesson.additional?.group === subject_props.group &&
                    lesson.additional?.subgroup === subject_props.subgroup
                ) {
                    filteredDateLessons.push(lesson);
                }
            }
        }
        filteredLessons.push({
            date: date.date,
            lessons: filteredDateLessons
        });

    }
    return filteredLessons;
}