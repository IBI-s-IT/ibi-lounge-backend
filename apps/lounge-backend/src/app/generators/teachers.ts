import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ListEntry } from '@repo/api-schema';
import { IbiServerDownError } from '@repo/generators';

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=2';

export async function generateTeachers() {
  const data = await axios.get(BASE_URL);

  if (data.data.includes('Соединение не установлено')) {
    return IbiServerDownError();
  }

  const dom = new JSDOM(data.data);

  const teachers: ListEntry[] = [];

  dom.window.document
    .querySelectorAll('#teacher > option')
    .forEach((ch: Element) => {
      teachers.push({
        name: ch.textContent!,
        id: ch.getAttribute('value')!,
      });
    });

  return teachers;
}
