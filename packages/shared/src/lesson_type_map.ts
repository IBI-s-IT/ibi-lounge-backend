import { type SchedulesLessonAdditional } from '@repo/api-schema/schedules';

export const lessonTypeMap: Record<SchedulesLessonAdditional['type'], string> =
  {
    unknown: '⚠️ Неизвестно',
    practice: 'Практика',
    lecture: 'Лекция',
    library_day: 'Библ. день',
    project_work: 'Проект. деят.',
    exam: '🚨 Экзамен',
    subject_report: '⚠️ Зачёт',
    consultation: 'ℹ️ Консультация',
    subject_report_with_grade: '⚠️ Диф. зачёт',
    course_work_defend: '⚠️ Защита курсовых',
    meeting: '📅Meeting',
  };
