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
            for (const subjectProps of subgroups) {
                if (lesson.text === subjectProps.subject &&
                    lesson.additional.group?.includes(subjectProps.group) &&
                    lesson.additional.subgroup?.includes(subjectProps.subgroup)
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