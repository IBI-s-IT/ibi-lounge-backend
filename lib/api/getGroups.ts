import {GetGroupsRequestQuery} from "../types/request";
import axios from "axios";
import {Group} from "../types/groups";
import {JSDOM} from 'jsdom';
import {wrapInError, wrapInResponse} from "../utils/response";
import {getCodFromEducationLevel} from "../utils/educationLevels";

const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/menu.php?tmenu=12';

export async function getGroups(query: GetGroupsRequestQuery) {
  try {
    let url = BASE_URL;

    if (!query['education_level']) {
      throw new Error('No education_level specified');
    }

    url += `&cod=${getCodFromEducationLevel(query['education_level'])}`

    const data = await axios.get(url);
    const dom = new JSDOM(data.data);

    let groups: Group[] = [];

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