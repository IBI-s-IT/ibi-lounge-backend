import axios from "axios";
import {wrapInError, wrapInResponse} from "../shared/wrapper";
import {parse} from "./parser";
import {filterSubgroups} from "./utils";
export const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/rasp.php';

export async function getSchedules(query: URLSearchParams) {
  const group = query.get('group');
  const dateStart = query.get('dateStart');
  const dateEnd = query.get('dateEnd');
  const subgroups = query.get('subgroups');
  const teacher = query.get('teacher');

  const defParams = {
    exam: 0,
    formo: 0,
    allp: 0,
    hour: 0,
  };

  try {
    const data = await axios.postForm(BASE_URL, teacher === null ? {
      rtype: 1,
      group,
      ...defParams,
      datafrom: dateStart,
      dataend: dateEnd,
      tuttabl: 0,
    } : {
      rtype: 2,
      ...defParams,
      datafrom: dateStart,
      dataend: dateEnd,
      teacher,
      kafedra: 0,
    })

    if (data.data.includes("Информации для отображения отчета не обнаружено! Измените период.")) {
      throw new Error('no_schedules')
    }

    const lessons_new = parse(data.data, teacher);

    if (subgroups) return wrapInResponse(filterSubgroups(lessons_new, JSON.parse(subgroups)));
    return wrapInResponse(lessons_new);

  } catch (e: any) {
    return wrapInError(e.message)
  }
}
