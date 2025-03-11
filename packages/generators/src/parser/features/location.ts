import { SchedulesLessonAdditional } from '@repo/api-schema/schedules';

export function detectClassroomSimple(
  text: string
): [SchedulesLessonAdditional['classroom'], string] {
  let result;

  const loc = text.match(/, ?ауд\. ?\W{1,2}-?[0-9]{1,3}-?[0-9](-web|-к)?/i);
  if (loc !== null) {
    const location = loc[0].replace(', ', '');
    text = text.replace(loc[0], '');
    result =
      location.split(' ')[1]?.replace(',', '') ?? location.replace('ауд.', '');
  }

  return [result, text];
}

/**
 * @see docs/places.md
 */
export function expandLocationData(
  location: string
): SchedulesLessonAdditional['classroom_details'] {
  const [prefix, ...rest] = location.split('-');
  const result: SchedulesLessonAdditional['classroom_details'] = {
    computer_classroom: false,
  };

  switch (prefix) {
    case 'Н':
      result.address = 'Невский проспект, 60, Санкт-Петербург, 191023';
      break;
    case 'МС':
      result.address = 'Малая Садовая улица, 6, Санкт-Петербург, 191023';
      break;
  }

  switch (rest[rest.length - 1]) {
    case 'к':
      result.computer_classroom = true;
      result.classroom_number = rest.slice(0, -1).join('-');
      break;
    case 'web':
      result.online_classroom = true;
      result.classroom_number = rest.slice(0, -1).join('-');
      break;
    default:
      result.classroom_number = rest.join('-');
  }

  return result;
}
