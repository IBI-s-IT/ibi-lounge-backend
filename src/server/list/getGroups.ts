import axios from "axios";
import {ListEntry} from "@shared/types";
import {JSDOM} from 'jsdom';
import {wrapInResponse} from "@shared/wrapper";
import {ListGroupsQuery} from "@server/list";
const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=12';

export async function getGroups(query: ListGroupsQuery) {
  const url = `${BASE_URL}&cod=${query.level}`;

  const data = await axios.get(url);

  if (data.data.includes("Соединение не установлено")) {
    throw new Error("Error on platform's side, no connection")
  }

  const dom = new JSDOM(data.data);

  let groups: ListEntry[] = [];

  dom.window.document.querySelectorAll('#group > option').forEach((ch: Element) => {
    groups.push({
      name: ch.textContent,
      id: ch.getAttribute('value'),
    });
  });

  return wrapInResponse(groups);
}
