import {GetSchedulesRequestQuery} from "../types/request";
import axios from "axios";
import {wrapInError, wrapInResponse} from "../utils/response";
import {parse} from "../utils/parser";

export const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/rasp.php';

export async function getSchedules(query: GetSchedulesRequestQuery) {
  const {group, dateStart, dateEnd} = query;

  try {
    const data = await axios.postForm(BASE_URL, {
      rtype: 1,
      group,
      exam: 0,
      formo: 0,
      allp: 0,
      hour: 0,
      tuttabl: 0,
      datafrom: dateStart,
      dataend: dateEnd,
    })

    if (data.data.includes("Информации для отображения отчета не обнаружено! Измените период.")) {
      throw new Error('no_data')
    }

    const lessons_new = parse(data.data);

    return wrapInResponse(lessons_new);
  } catch (e: any) {
    return wrapInError(e.message)
  }
}
