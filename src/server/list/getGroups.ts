import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ListEntry, ListQuery } from '@server/list/types';
import { IbiServerDownError } from '@shared/errors';
const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=12';

export async function getGroups(query: ListQuery) {
  const url = `${BASE_URL}&cod=${query.level}`;

  const data = await axios.get(url);

  if (data.data.includes('Соединение не установлено')) {
    return IbiServerDownError();
  }

  const dom = new JSDOM(data.data);

  let groups: ListEntry[] = [];

  dom.window.document
    .querySelectorAll('#group > option')
    .forEach((ch: Element) => {
      groups.push({
        name: ch.textContent!,
        id: ch.getAttribute('value')!,
      });
    });

  return groups;
}
