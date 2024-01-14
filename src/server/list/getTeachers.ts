import axios from 'axios';
import { JSDOM } from 'jsdom';
import { wrapInResponse } from '@shared/wrapper';
import { ListEntry } from '@server/list/types';

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=2';

export async function getTeachers() {
  const data = await axios.get(BASE_URL);

  if (data.data.includes('Соединение не установлено')) {
    throw new Error("Error on platform's side, no connection");
  }

  const dom = new JSDOM(data.data);

  let levels: ListEntry[] = [];

  dom.window.document
    .querySelectorAll('#teacher > option')
    .forEach((ch: Element) => {
      levels.push({
        name: ch.textContent!,
        id: ch.getAttribute('value')!,
      });
    });

  return wrapInResponse(levels);
}
