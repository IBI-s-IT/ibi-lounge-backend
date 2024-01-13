import axios from "axios";
import {wrapInResponse} from "@shared/wrapper";
import {parse} from "./parser";
import {filterSubgroups} from "./utils";
import {SchedulesQuery} from "@server/schedules/types";

export const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/rasp.php';

export async function getSchedules(query: SchedulesQuery) {
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
  } else {
    throw 'no group or teacher param';
  }

  const data = await axios.postForm(BASE_URL, params);

  if (data.data.includes("Информации для отображения отчета не обнаружено! Измените период.")) {
    throw new Error('no_schedules')
  }

  const lessons = parse(data.data, 'teacher' in query);

  if ('subgroups' in query && query.subgroups) {
    return wrapInResponse(filterSubgroups(lessons, JSON.parse(query.subgroups)));
  }

  return wrapInResponse(lessons);
}
