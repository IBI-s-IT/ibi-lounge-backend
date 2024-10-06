import { parseAdditional } from '../index.js';

const onlineLecture =
  'Менеджмент -Лекц, Некрасова Н.В., ауд. Н-202-web, ОНЛАЙН! https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=1027 ';

const offlinePractice = 'ТеорСистСистАн -Прак, Солодовников М.А., ауд. МС-53 ';

const subjectReportInComputerClassroom =
  'ОбъектОрПрогр-е -Зач, Комарова Е.В., ауд. МС-51-к ';

const subjectReportWithGrade = 'Мат.анализ -ДифЗ, Антипова Т.Б., ауд. МС-34 ';

const consultation = 'МетОптимРеш -Конс, Смирнова Е.Ю., ауд. МС-52-к ';

const exam = 'Упр-еИнфБезоп-ю -Экз, Кияев В.И., ауд. МС-31';

const courseWorkDefend = 'Микроэкономика -ЗКР, Никитина С.П., ауд. МС-42 ';

const teacherGroups =
  'Ин.язык, Прак, ауд.Н-202-2, гр.45Р-31,45Ф-31,45П-31, ОНЛАЙН! https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=29363 ';

const englishGroupSubgroup = `Ин.язык -Прак, Белоусова Ю.В., ауд. МС-44-к, Группа 2А, Подгруппа 1 `;

const englishMultipleSubgroups = `Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 1В И ПОДГРУППА 3В `;

const compensation =
  'ОснРосГосуд-ти -Лекц, Батищева Н.А., ауд. Н-202-1, <font color="red"><b> ОНЛАЙН! </b></font> Возмещение за 13.09.23 https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=28300&nbsp;';

describe('should parse additional from lessons text', () => {
  describe('should parse type', () => {
    test('lecture', () => {
      const [additional] = parseAdditional(onlineLecture, false);
      expect(additional.type).toBe('lecture');
    });

    test('practice', () => {
      const [additional] = parseAdditional(offlinePractice, false);
      expect(additional.type).toBe('practice');
    });

    test('consultation', () => {
      const [additional] = parseAdditional(consultation, false);
      expect(additional.type).toBe('consultation');
    });

    test('subject report', () => {
      const [additional] = parseAdditional(
        subjectReportInComputerClassroom,
        false
      );
      expect(additional.type).toBe('subject_report');
    });

    test('subject report with grade', () => {
      const [additional] = parseAdditional(subjectReportWithGrade, false);
      expect(additional.type).toBe('subject_report_with_grade');
    });

    test('exam', () => {
      const [additional] = parseAdditional(exam, false);
      expect(additional.type).toBe('exam');
    });

    test('course work defend', () => {
      const [additional] = parseAdditional(courseWorkDefend, false);
      expect(additional.type).toBe('course_work_defend');
    });
  });

  describe('should detect online/offline', () => {
    test('online', () => {
      const [additional] = parseAdditional(onlineLecture, false);
      expect(additional.is_online).toBe(true);
    });

    test('offline', () => {
      const [additional] = parseAdditional(offlinePractice, false);
      expect(additional.is_online).toBe(undefined);
    });
  });

  test('should detect teachers groups', () => {
    const [additional] = parseAdditional(teacherGroups, true);
    expect(additional.teacher_groups).toStrictEqual([
      '45Р-31',
      '45Ф-31',
      '45П-31',
    ]);
  });

  describe('groups and subgroups', () => {
    test('should detect groups', () => {
      const [additional] = parseAdditional(englishGroupSubgroup, false);
      expect(additional.group).toStrictEqual(['А']);
    });

    test('should detect subgroups', () => {
      const [additional] = parseAdditional(englishGroupSubgroup, false);
      expect(additional.subgroup).toStrictEqual(['1']);
    });

    test('should detect many subgroups', () => {
      const [additional] = parseAdditional(englishMultipleSubgroups, false);
      expect(additional.subgroup).toStrictEqual(['1', '3']);
      expect(additional.group).toStrictEqual(['В']);
    });
  });

  test('should detect compensation', () => {
    const [additional] = parseAdditional(compensation, false);
    expect(additional.compensation).toBe('13.09.23');
  });

  test('should parse urls', () => {
    const [additional] = parseAdditional(onlineLecture, false);
    expect(additional.url).toBe(
      'https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=1027'
    );
  });

  describe('should parse classrooms', () => {
    test('should detect H classroom', () => {
      const [additional] = parseAdditional(onlineLecture, false);
      expect(additional.classroom).toBe('Н-202-web');
    });

    test('should detect MC classroom', () => {
      const [additional] = parseAdditional(offlinePractice, false);
      expect(additional.classroom).toBe('МС-53');
    });

    describe('should detail classrooms', () => {
      test('should detect computer classroom', () => {
        const [additional] = parseAdditional(
          subjectReportInComputerClassroom,
          false
        );
        expect(additional.classroom_details!.computer_classroom).toBe(true);
        expect(additional.classroom_details!.classroom_number).toBe('51');
      });
    });
  });
});
