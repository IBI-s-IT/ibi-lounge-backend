import { SchedulesLessonAdditional } from '@server/schedules/types';

export function detectType(
  text: string
): [SchedulesLessonAdditional['type'], string] {
  let type: SchedulesLessonAdditional['type'] = 'unknown';

  if (text.match(/,? ?-?Лекц/gi)) {
    text = text.replace(/,? ?-?Лекц/gi, '');
    type = 'lecture';
  }

  if (text.match(/,? ?-?Прак/gi)) {
    text = text.replace(/,? ?-?Прак/gi, '');
    type = 'practice';
  }

  if (text.match(/,? ?-?Конс/gi)) {
    text = text.replace(/,? ?-?Конс/gi, '');
    type = 'consultation';
  }

  if (text.match(/,? ?-?ДифЗ/gi)) {
    text = text.replace(/,? ?-?ДифЗ/gi, '');
    type = 'subject_report_with_grade';
  }

  if (text.match(/,? ?-?Экз/gi)) {
    text = text.replace(/,? ?-?Экз/gi, '');
    type = 'exam';
  }

  if (text.match(/,? ?-?Зач/gi)) {
    text = text.replace(/,? ?-?Зач/gi, '');
    type = 'subject_report';
  }

  if (text.match(/,? ?-?ЗКР/gi)) {
    text = text.replace(/,? ?-?ЗКР/gi, '');
    type = 'course_work_defend';
  }

  if (text.includes('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ')) {
    text = text.replace('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ', '');
    type = 'library_day';
  }

  if (text.match(/,? ?-?ПроД/gi)) {
    text = text.replace(/,? ?-?ПроД/gi, '');
    type = 'project_work';
  }

  return [type, text];
}
