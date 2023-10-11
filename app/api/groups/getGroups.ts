import axios from "axios";
import {IdName} from "../shared/types";
import {JSDOM} from 'jsdom';
import {wrapInError, wrapInResponse} from "../shared/wrapper";
import {getCodFromEducationLevel} from "./utils";
import {EducationLevel} from "../../../src/types/schedules";

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=12';

export async function getGroups(query: URLSearchParams) {
  try {
    let url = BASE_URL;

    if (!query.has('education_level') && !query.has('level_id')) {
      throw new Error('no_education_level_specified');
    }

    const education_level = query.get('education_level');
    const level_id = query.get('level_id');

    url += `&cod=${query.has('education_level') ? getCodFromEducationLevel(education_level as EducationLevel) : level_id}`;

    const data = await axios.get(url);
    if (data.data.includes("Соединение не установлено")) {
      throw new Error("bad_error")
    }
    const dom = new JSDOM(data.data);

    let groups: IdName[] = [];

    dom.window.document.querySelectorAll('#group > option').forEach((ch: Element) => {
      groups.push({
        name: ch.textContent,
        id: ch.getAttribute('value'),
      });
    });

    return wrapInResponse(groups);
  } catch (e: any) {
    return wrapInError(e.message);
  }
}
