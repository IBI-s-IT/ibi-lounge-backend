import axios from "axios";
import {IdName} from "../shared/types";
import {JSDOM} from 'jsdom';
import {wrapInError, wrapInResponse} from "../shared/wrapper";

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=1';

export async function getLevels() {
  try {
    const data = await axios.get(BASE_URL);

    if (data.data.includes("Соединение не установлено")) {
      throw new Error("bad_error")
    }

    const dom = new JSDOM(data.data);

    let levels: IdName[] = [];

    dom.window.document.querySelectorAll('#ucstep > option').forEach((ch: Element) => {
      levels.push({
        name: ch.textContent,
        id: ch.getAttribute('value'),
      });
    });

    return wrapInResponse(levels);
  } catch (e: any) {
    return wrapInError(e.message);
  }
}
