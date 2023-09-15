export interface LessonDay {
  date:    Date;
  lessons: Lesson[];
}

export interface Lesson {
  text:        string;
  time_start:  Date;
  time_end:    Date;
  additional?: AdditionalLessonData;
}

/**
 * - `practice`: Практика
 * - `lecture`: Лекция
 * - `library_day`: Библиотечный день (в 2023 году не встречался)
 * - `project_work`: Проектная деятельность (в 2023 году не встречался)
 * - `exam`: Экзамен
 * - `subject_report`: Зачёт
 * - `consultation`: Консультация
 * - `subject_report_with_grade`: Дифференцированный зачёт
 */
type AdditionalLessonDataType = 'practice' | 'lecture' | 'library_day' | 'project_work' | 'exam' | 'subject_report' | 'consultation' | 'subject_report_with_grade';

interface CustomTime {
  start: Date;
  end:   Date;
}

export interface AdditionalLessonData {
  is_online?:    boolean;
  type?:         AdditionalLessonDataType;
  url?:          string;
  group?:        string;
  subgroup?:     string;
  location?:     string;
  custom_time?:  CustomTime;
  teacher_name?: string;
  compensation?: string;
}
