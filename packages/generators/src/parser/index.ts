import {
  SchedulesDay,
  SchedulesLesson,
  SchedulesLessonAdditional,
} from '@repo/api-schema/schedules';
import { JSDOM } from 'jsdom';
import { detectCustomTime } from './features/customTime.js';
import { detectCompensation } from './features/compensation.js';
import { detectType } from './features/type.js';
import {
  detectClassroomSimple,
  expandLocationData,
} from './features/location.js';
import { SchedulesParsingError } from '../errors.js';

export function parseAdditional(
  text: string,
  teacher: boolean,
  maybeUrl?: string | null
): [SchedulesLessonAdditional, string] {
  const result: SchedulesLessonAdditional = {
    type: 'unknown',
  };

  if (maybeUrl) {
    result.url = maybeUrl;
  }

  if (text.includes('ОНЛАЙН!')) {
    text = text.replace('ОНЛАЙН!', '');
    text = text.trim();
    result.is_online = true;
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

export function parseLesson(
  timeStart: string,
  timeEnd: string,
  lessonText: string,
  isTeachers: boolean,
  maybeUrl?: string | null
): SchedulesLesson {
  const [additional, left] = parseAdditional(lessonText, isTeachers, maybeUrl);
  const custom = detectCustomTime(left);

  return {
    text: custom === undefined ? left : custom[2],
    time_start: custom === undefined ? timeStart.trim() : custom[0],
    time_end: custom === undefined ? timeEnd.trim() : custom[1],
    additional: additional,
  };
}

export function parseTable(html: string, teacher: boolean = false) {
  const el = new JSDOM(html);
  const times = el.window.document.querySelectorAll(
    'table > tbody > tr > td > b'
  );
  const rows = el.window.document.querySelectorAll('table > tbody > tr');

  if (!rows.length)
    return SchedulesParsingError(
      'Возникла проблема с обработкой данных (rows)'
    );

  const lesson_num = rows[1].childElementCount + 2;

  const days: SchedulesDay[] = [];

  for (let rowcol = 2; rowcol < rows.length; rowcol++) {
    const day_month_el = rows[rowcol].childNodes[1];
    if (day_month_el.textContent === null)
      return SchedulesParsingError(
        'Возникла проблема с обработкой данных (day/month)'
      );

    const [date, week_day] = day_month_el.textContent!.trim().split(' ');
    const [day, month] = date.split('.');

    days[rowcol - 2] = {
      day,
      month,
      week_day,
      lessons: [],
    };

    // days
    for (let col = 2; col < lesson_num; col++) {
      // lessons in days
      const cols = rows[rowcol].childNodes;
      const textEl = cols[col];
      const timeEl = times[col];

      if (timeEl.textContent === null)
        return SchedulesParsingError(
          'Возникла проблема с обработкой данных (timeEl)'
        );

      if (textEl.textContent === null)
        return SchedulesParsingError(
          'Возникла проблема с обработкой данных (textEl)'
        );

      const [time_start, time_end] = timeEl.textContent.split('-');

      if (textEl.textContent.trim() !== '') {
        let lessonText = textEl.textContent.trim();

        if (lessonText.includes('--------')) {
          const urlEl = textEl.parentElement?.querySelector('a');
          const maybeHref = urlEl?.getAttribute('href');

          if (urlEl && urlEl.textContent) {
            lessonText = lessonText.replace(urlEl.textContent, '');
          }

          lessonText.split('--------').forEach((splitLessonText) => {
            days[rowcol - 2].lessons.push(
              parseLesson(
                time_start,
                time_end,
                splitLessonText,
                teacher,
                maybeHref
              )
            );
          });
        } else {
          const urlEl = textEl.parentElement?.querySelector('a');
          const maybeHref = urlEl?.getAttribute('href');

          if (urlEl && urlEl.textContent) {
            lessonText = lessonText.replace(urlEl.textContent, '');
          }

          days[rowcol - 2].lessons.push(
            parseLesson(time_start, time_end, lessonText, teacher, maybeHref)
          );
        }
      }
    }
  }

  return days;
}
