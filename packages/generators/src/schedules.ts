import axios from 'axios';
import { parseTable } from './parser/index.js';
import { filterSubgroups } from './utils.js';
import { SchedulesQuery } from '@repo/api-schema/schedules';

export const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/rasp.php';

export async function generateSchedules(query: SchedulesQuery) {
  const { dateStart, dateEnd } = query;

  const params = {
    exam: 0,
    formo: 0,
    allp: 0,
    hour: 0,
    datafrom: dateStart,
    dataend: dateEnd,
  };

  if ('teacher' in query) {
    Object.assign(params, {
      rtype: 2,
      teacher: query.teacher,
      kafedra: 0,
    });
  } else if ('group' in query) {
    Object.assign(params, {
      rtype: 1,
      group: query.group,
      tuttabl: 0,
    });
  }

  const req = await axios.postForm(BASE_URL, params, {
    responseType: 'arraybuffer',
  });

  const response = new TextDecoder('windows-1251').decode(req.data);

  if (
    response.includes(
      'Информации для отображения отчета не обнаружено! Измените период.'
    )
  ) {
    // Пустой список при отсутствии информации - тоже успешный ответ
    return [];
  }

  const schedulesDays = parseTable(response, 'teacher' in query);

  if ('name' in schedulesDays) {
    return schedulesDays;
  }

  if (query.subgroups) {
    return filterSubgroups(schedulesDays, query.subgroups);
  }

  return schedulesDays;
}
