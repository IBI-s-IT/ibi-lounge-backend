import { SchedulesLessonAdditional } from '@repo/api-schema';

export function detectType(
  text: string
): [SchedulesLessonAdditional['type'], string] {
  let type: SchedulesLessonAdditional['type'] = 'unknown';

  if (text.match(/,? ?-?Лекц/i)) {
    text = text.replace(/,? ?-?Лекц/i, '');
    type = 'lecture';
  }

  if (text.match(/,? ?-?Прак/i)) {
    text = text.replace(/,? ?-?Прак/i, '');
    type = 'practice';
  }

  if (text.match(/,? ?-?Конс/i)) {
    text = text.replace(/,? ?-?Конс/i, '');
    type = 'consultation';
  }

  if (text.match(/,? ?-?ДифЗ/i)) {
    text = text.replace(/,? ?-?ДифЗ/i, '');
    type = 'subject_report_with_grade';
  }

  if (text.match(/,? ?-?Экз/i)) {
    text = text.replace(/,? ?-?Экз/i, '');
    type = 'exam';
  }

  if (text.match(/,? ?-?Зач/i)) {
    text = text.replace(/,? ?-?Зач/i, '');
    type = 'subject_report';
  }

  if (text.match(/,? ?-?ЗКР/i)) {
    text = text.replace(/,? ?-?ЗКР/i, '');
    type = 'course_work_defend';
  }

  if (text.includes('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ')) {
    text = text.replace('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ', '');
    type = 'library_day';
  }

  if (text.match(/,? ?-?ПроД/i)) {
    text = text.replace(/,? ?-?ПроД/i, '');
    type = 'project_work';
  }

  return [type, text];
}
