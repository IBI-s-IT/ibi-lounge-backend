import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ListEntry } from '@repo/api-schema/list';
import { IbiServerDownError } from '../errors.js';

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=1';

export async function generateLevels() {
  const req = await axios.get(BASE_URL, { responseType: 'arraybuffer' });
  const response = new TextDecoder('windows-1251').decode(req.data);

  if (response.includes('Соединение не установлено')) {
    return IbiServerDownError();
  }

  const dom = new JSDOM(response);

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
