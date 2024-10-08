import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ListEntry } from '@repo/api-schema/list';
import { IbiServerDownError } from '../errors.js';

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=1';

export async function generateLevels() {
  const data = await axios.get(BASE_URL);

  if (data.data.includes('Соединение не установлено')) {
    return IbiServerDownError();
  }

  const dom = new JSDOM(data.data);

  const levels: ListEntry[] = [];

  dom.window.document
    .querySelectorAll('#ucstep > option')
    .forEach((ch: Element) => {
      levels.push({
        name: ch.textContent!,
        id: ch.getAttribute('value')!,
      });
    });

  return levels;
}
