import axios from "axios";
import {Group} from "../types/groups";
import {JSDOM} from 'jsdom';
import {wrapInError, wrapInResponse} from "../utils/response";

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=1';

export async function getLevels() {
  try {
    const data = await axios.get(BASE_URL);

    if (data.data.includes("Соединение не установлено")) {
      throw new Error("bad_error")
    }

    const dom = new JSDOM(data.data);

    let groups: Group[] = [];

    dom.window.document.querySelectorAll('#ucstep > option').forEach((ch: Element) => {
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
