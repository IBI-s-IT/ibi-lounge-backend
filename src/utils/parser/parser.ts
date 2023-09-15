import {AdditionalLessonData, LessonDay} from "../../types/parser";
import {JSDOM} from "jsdom";
import {detectCustomTime} from "./features/customTime";
import {detectURLs} from "./features/url";

function detectCompensation(text: string): [string | null, string] {
  const compensation = text.match(/[0-9]{2}\.[0-9]{2}\.[0-9]{2}/i);
  if (compensation !== null) {
    text = text.replace(`Возмещение за ${compensation[0]}`, '');
    return [compensation[0], text];
  }

  return [null, text]
}

export function parseAdditionals(text: string, date: Date): [AdditionalLessonData, string] {
  let result: AdditionalLessonData = {};

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

  if (text.includes('-Лекц')) {
    text = text.replace(' -Лекц', '');
    result.type = 'lecture';
  }

  if (text.includes('-Прак')) {
    text = text.replace(' -Прак', '');
    result.type = 'practice';
  }

  if (text.includes('-Конс')) {
    text = text.replace(' -Конс', '');
    result.type = 'consultation';
  }

  if (text.includes('-ДифЗ')) {
    text = text.replace(' -ДифЗ', '');
    result.type = 'subject_report_with_grade';
  }

  if (text.includes('-Экз')) {
    text = text.replace(' -Экз', '');
    result.type = 'exam';
  }

  if (text.includes('-Зач')) {
    text = text.replace(' -Зач', '');
    result.type = 'subject_report';
  }

  if (text.includes('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ')) {
    text = text.replace('БИБЛИОТЕЧНЫЙ ДЕНЬ!  ', '');
    result.type = 'library_day';
  }

  if (text.includes('-ПроД')) {
    text = text.replace(' -ПроД', '');
    result.type = 'project_work'
  }

  const groups = [...text.matchAll(/Группа [0-9][А-яA-z]/gi)].map((el) => el[0]);
  if (groups.length) {
    text = text.replace(groups[0], '');
    result.group = groups[0][groups[0].length - 1];
    text = text.trim();
  }


  const subgroups = [...text.matchAll(/Подгруппа [0-9]/gi)].map((el) => el[0]);
  if (subgroups.length) {
    text = text.replace(subgroups[0], '');
    result.subgroup = subgroups[0][subgroups[0].length - 1];
    text = text.trim();
  }

  const parsedUrls = detectURLs(text);
  if (parsedUrls !== null) {
    result.url = parsedUrls[0];
    text = text.replace(parsedUrls[0], '');
    text = text.trim();
  }

  const [compensation, left] = detectCompensation(text);
  if (compensation) {
    result.compensation = compensation;
    text = left;
  }

  const custom_time = detectCustomTime(date, text);
  if (custom_time) {
    const [start, end, left] = custom_time;
    result.custom_time = {
      start,
      end
    };

    text = left;
  }

  const loc = text.match(/, ауд\. \W{1,2}-?[0-9]{1,3}-?[0-9](-web|-к|-н)?/i);
  if (loc !== null) {
    const location = loc[0].replace(', ', '');
    text = text.replace(loc[0], '');
    result.location = location.split(' ')[1].replace(',', '');
  }

  const teacher_name = text.match(/, .* .\..\./i);
  if (teacher_name) {
    text = text.replace(teacher_name[0], '');
    result.teacher_name = teacher_name[0].replace(', ', '');
    text = text.trim();
  }

  text = text.replace(/^,|,$/g,'');
  text = text.trim();
  text = text.replace(/^,|,$/g,'');

  return [result, text];
}

export function parse(html: string) {
  const el = new JSDOM(html);
  const times = el.window.document.querySelectorAll("table > tbody > tr > td > b");
  const rows = el.window.document.querySelectorAll("table > tbody > tr");

  if (!rows.length) throw new Error('bad_error_159');

  const year = (new Date()).getFullYear();

  let lesson_num = rows[1].childElementCount + 2;

  let lessons_new: LessonDay[] = [];

  for (let rowcol = 2; rowcol < rows.length; rowcol++) {
    const day_month_el = rows[rowcol].childNodes[1];
    if (day_month_el.textContent === null) throw new Error('bad_error_169');

    const day_month = day_month_el.textContent.trim().split(' ')[0].split('.');
    const date = new Date(year, Number(day_month[1]) - 1, Number(day_month[0]));
    lessons_new[rowcol - 2] = {
      date,
      lessons: [],
    };

    // days
    for (let col = 2; col < lesson_num; col++) {
      // lessons in days
      const cols = rows[rowcol].childNodes;
      const textEl = cols[col];
      const timeEl = times[col];
      if (textEl.textContent === null) throw new Error('bad_error_184');
      if (timeEl.textContent === null) throw new Error('bad_error_185');
      if (textEl.textContent.trim() !== "") {
        // lesson
        const time = timeEl.textContent.trim();
        const time_start = time.split('-')[0];
        const time_start_hrs = time_start.split(':')[0];
        const time_start_min = time_start.split(':')[1];
        const time_start_date = new Date(new Date(date).setHours(Number(time_start_hrs), Number(time_start_min)));

        const time_end = time.split('-')[1];
        const time_end_hrs = time_end.split(':')[0];
        const time_end_min = time_end.split(':')[1];
        const time_end_date = new Date(new Date(date).setHours(Number(time_end_hrs), Number(time_end_min)));

        const text = textEl.textContent.trim();

        if (text.includes('--------')) {
          text.split('--------').forEach((splitted) => {
            const [additional, left] = parseAdditionals(splitted, time_start_date);

            lessons_new[rowcol - 2].lessons.push({
              text: left,
              time_start: (additional.custom_time && additional.custom_time.start) ?? time_start_date,
              time_end: (additional.custom_time && additional.custom_time.end) ?? time_end_date,
              additional: additional,
            })
          });
        } else {
          const [additional, left] = parseAdditionals(text, time_start_date);

          lessons_new[rowcol - 2].lessons.push({
            text: left,
            time_start: (additional.custom_time && additional.custom_time.start) ?? time_start_date,
            time_end: (additional.custom_time && additional.custom_time.end) ?? time_end_date,
            additional: additional,
          })
        }
      }
    }
  }

  return lessons_new;
}
