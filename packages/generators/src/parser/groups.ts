import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ListEntry, GroupsQuery } from '@repo/api-schema';
import { IbiServerDownError } from '../errors';
const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=12';

export async function generateGroups(query: GroupsQuery) {
  const url = `${BASE_URL}&cod=${query.level}`;

  const data = await axios.get(url);

  if (data.data.includes('Соединение не установлено')) {
    return IbiServerDownError();
  }

  const dom = new JSDOM(data.data);

  const groups: ListEntry[] = [];

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
