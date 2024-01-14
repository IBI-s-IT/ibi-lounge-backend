import { SchedulesDay, SchedulesLessonAdditional } from '../types';
import { JSDOM } from 'jsdom';
import { detectCustomTime } from './features/customTime';
import { detectURLs } from './features/url';
import { detectCompensation } from './features/compensation';
import { detectType } from '@server/schedules/parser/features/type';
import {
  detectClassroomSimple,
  expandLocationData,
} from '@server/schedules/parser/features/location';

export function parseAdditionals(
  text: string,
  teacher: boolean
): [SchedulesLessonAdditional, string] {
  let result: SchedulesLessonAdditional = {
    type: 'unknown',
  };

  if (text.includes('ОНЛАЙН!')) {
    text = text.replace('ОНЛАЙН!', '');
    text = text.trim();
    result.is_online = true;
  }

  if (text.includes('ОНЛАЙН ЛЕКЦИЯ!')) {
    text = text.replace('ОНЛАЙН ', '');
    text = text.trim();
    result.is_online = true;
    result.type = 'lecture';
  }

  if (text.includes(', ауд. Дистанцион')) {
    text = text.replace(', ауд. Дистанцион', '');
  }

  const [type, textAfterType] = detectType(text);
  text = textAfterType;
  result.type = type;

  const subgroups = [...text.matchAll(/Подгруппа [0-9][A-zА-я]?/gi)].map(
    (el) => el[0]
  );
  const group_names: string[] = [];
  if (subgroups.length) {
    const subgroups_list: string[] = [];
    subgroups.forEach((subgroup: string) => {
      text = text.replace(subgroup, '');
      if (subgroup.match(/Подгруппа [0-9][A-zА-я]/gi)) {
        group_names.push(subgroup[subgroup.length - 1]);
        subgroup = subgroup.slice(0, -1);
      }
      subgroups_list.push(subgroup[subgroup.length - 1]);
    });
    text = text.trim();
    result.subgroup = [...new Set(subgroups_list)];
  }

  const groups = [...text.matchAll(/Группа [0-9][А-яA-z]/gi)].map(
    (el) => el[0]
  );
  if (groups.length || group_names.length) {
    const group_list = [...group_names];
    groups.forEach((group) => {
      text = text.replace(group, '');
      group_list.push(group[group.length - 1]);
    });
    text = text.trim();
    result.group = [...new Set(group_list)];
  }

  const parsedUrls = detectURLs(text);
  if (parsedUrls !== null) {
    result.url = parsedUrls[0];
    text = text.replace(parsedUrls[0], '');
    text = text.trim();
  }

  if (teacher && text.match(/гр\.(.*)/gi) !== null) {
    const teachers_groups = text
      .match(/гр\.(.*)/gi)![0]
      ?.replace('гр.', '')
      .split(',')
      .filter((n) => n);
    text = text.replace(/гр\.(.*)/gi, '');
    result.teacher_groups = teachers_groups;
  }

  const [compensation, leftCompensation] = detectCompensation(text);
  if (compensation) {
    result.compensation = compensation;
    text = leftCompensation;
  }

  const [location, leftLocation] = detectClassroomSimple(text);
  if (location) {
    result.classroom = location;
    result.classroom_details = expandLocationData(location);
    text = leftLocation;
  }

  const teacher_name = text.match(/, .* .\..\./i);
  if (teacher_name) {
    text = text.replace(teacher_name[0], '');
    result.teacher_name = teacher_name[0].replace(', ', '');
    text = text.trim();
  }

  text = text.replace(/^,|,$/g, '');
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/, и/gi, '');
  text = text.replace(/^,|,$/g, '');

  return [result, text];
}

export function parse(html: string, teacher: boolean = false) {
  const el = new JSDOM(html);
  const times = el.window.document.querySelectorAll(
    'table > tbody > tr > td > b'
  );
  const rows = el.window.document.querySelectorAll('table > tbody > tr');

  if (!rows.length) throw new Error('bad_error_159');

  let lesson_num = rows[1].childElementCount + 2;

  let lessons_new: SchedulesDay[] = [];

  for (let rowcol = 2; rowcol < rows.length; rowcol++) {
    const day_month_el = rows[rowcol].childNodes[1];
    if (day_month_el.textContent === null)
      throw new Error('Failed to parse day/month element');

    const day_month = day_month_el.textContent!.trim().split(' ')[0].split('.');

    lessons_new[rowcol - 2] = {
      day: day_month[0],
      month: day_month[1],
      week_day: day_month_el.textContent.split(' ')[1].trim(),
      lessons: [],
    };

    // days
    for (let col = 2; col < lesson_num; col++) {
      // lessons in days
      const cols = rows[rowcol].childNodes;
      const textEl = cols[col];
      const timeEl = times[col];

      if (timeEl.textContent === null)
        throw new Error('Failed to parse time rows');
      if (textEl.textContent === null)
        throw new Error('Failed to parse text rows/cols');

      const [time_start, time_end] = timeEl.textContent.split('-');

      if (textEl.textContent.trim() !== '') {
        const text = textEl.textContent.trim();

        if (text.includes('--------')) {
          text.split('--------').forEach((splitted) => {
            const [additional, left] = parseAdditionals(splitted, teacher);
            const custom = detectCustomTime(left);

            lessons_new[rowcol - 2].lessons.push({
              text: custom === undefined ? left : custom[2],
              time_start: custom === undefined ? time_start.trim() : custom[0],
              time_end: custom === undefined ? time_end.trim() : custom[1],
              additional: additional,
            });
          });
        } else {
          const [additional, left] = parseAdditionals(text, teacher);
          const custom = detectCustomTime(left);

          lessons_new[rowcol - 2].lessons.push({
            text: custom === undefined ? left : custom[2],
            time_start: custom === undefined ? time_start.trim() : custom[0],
            time_end: custom === undefined ? time_end.trim() : custom[1],
            additional: additional,
          });
        }
      }
    }
  }

  return lessons_new;
}
