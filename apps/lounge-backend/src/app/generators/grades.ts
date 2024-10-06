import axios from 'axios';
import { Grade, GradesQuery } from '@repo/api-schema/grades';
import { JSDOM } from 'jsdom';
import { GradesDataMismatchError } from '@repo/generators';

export const BASE_URL = 'http://inet.ibi.spb.ru/raspisan/rasp.php';

export async function generateGrades(query: GradesQuery) {
  const { last_name, pin } = query;

  const data = await axios.postForm(BASE_URL, {
    rtype: 6,
    fio1: last_name,
    pin1: pin,
  });

  if (data.data.includes('Введенная фамилия не соответствует пин коду!')) {
    return GradesDataMismatchError();
  }
  const dom = new JSDOM(data.data);

  const grades: Grade[] = [];

  dom.window.document.querySelectorAll('tr').forEach((row: Element, index) => {
    if (index !== 0) {
      const [name, type, grade] = row.querySelectorAll('td');
      let formattedType: Grade['type'];

      switch (type.textContent?.trim()) {
        case 'Дифференцированный зачет':
          formattedType = 'subject_report_with_grade';
          break;
        case 'Курсовая работа (очно)':
          formattedType = 'offline_course_work';
          break;
        case 'Экзамен':
          formattedType = 'exam';
          break;
        case 'Зачёт':
          formattedType = 'subject_report';
          break;
        case 'Курсовая работа (заочно)':
          formattedType = 'online_course_work';
          break;
        default:
          formattedType = 'unknown';
          break;
      }

      let formattedGrade: Grade['grade'];

      switch (grade.textContent?.trim()) {
        case 'н/я':
          formattedGrade = 'absence';
          break;
        case 'зач.':
          formattedGrade = 'passed';
          break;
        case 'н/зач.':
          formattedGrade = 'failed';
          break;
        case '5':
          formattedGrade = '5';
          break;
        case '4':
          formattedGrade = '4';
          break;
        case '3':
          formattedGrade = '3';
          break;
        case '2':
          formattedGrade = '2';
          break;
        case 'н/доп.':
          formattedGrade = 'not_admitted';
          break;
        default:
          formattedGrade = 'unknown';
          break;
      }

      grades.push({
        name: name?.textContent?.trim() ?? 'Неизвестный предмет',
        type: formattedType,
        grade: formattedGrade,
      });
    }
  });

  return grades;
}
