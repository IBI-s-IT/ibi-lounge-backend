import { parseTable } from '../index.js';
import { SchedulesDay } from '@repo/api-schema/schedules';

const customTimed = `<center>
    <h4>Расписание группы 113-ПИвЭ за период с 19.09.2023 по 19.09.2023</h4>
</center>
<table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;'>
    <tr align=center>
        <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'>
            <b>Дата</b>
        </td>
        <td colspan=5 style='border-color: Black; background-color: #f6ecc8'>
            <b>Время занятий</b>
        </td>
    </tr>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>9:00-10:30 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>10:40-12:10 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>12:50-14:20 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>14:30-16:00 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>16:10-17:40 &nbsp;</b>
    </td>
</tr>
<tr style='background-color: transparent' align=center>
    <td style='border-color: Black;'>19.09 Вт &nbsp;</td>
    <td style='border-color: Black;'>
        ПроектированИС -Лекц, Штенников Д.Г., ауд. Н-202-1, 
        <font color=red>
            <b>ОНЛАЙН! Начало в 10.00 </b>
        </font>
        &nbsp;
    </td>
    <td style='border-color: Black;'>
        ПроектированИС -Лекц, Штенников Д.Г., ауд. Н-202-1, 
        <font color=red>
            <b>ОНЛАЙН! Начало в 11.30 </b>
        </font>
        &nbsp;
    </td>
    <td style='border-color: Black;'>&nbsp;</td>
    <td style='border-color: Black;'>
        ПроектированИС -Прак, Штенников Д.Г., ауд. МС-52-к, 
        <font color=red>
            <b>Начало в 15.30 </b>
        </font>
        &nbsp;
    </td>
    <td style='border-color: Black;'>
        ПроектированИС -Прак, Штенников Д.Г., ауд. МС-52-к, 
        <font color=red>
            <b>Начало в 17.00</b>
        </font>
        &nbsp;
    </td>
</tr>
</table>
`;

const englishLessons = `
<center>
    <h4>Расписание группы 123-ПИвЭ за период с 06.09.2023 по 06.09.2023</h4>
</center>
<table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;'>
    <tr align=center>
        <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'>
            <b>Дата</b>
        </td>
        <td colspan=4 style='border-color: Black; background-color: #f6ecc8'>
            <b>Время занятий</b>
        </td>
    </tr>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>9:00-10:30 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>10:40-12:10 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>12:50-14:20 &nbsp;</b>
    </td>
    <td align=center style='border-color: Black; background-color: #f6ecc8'>
        <b>14:30-16:00 &nbsp;</b>
    </td>
</tr>
<tr style='background-color: transparent' align=center>
    <td style='border-color: Black;'>6.09 Ср &nbsp;</td>
    <td style='border-color: Black;'>
        Ин.язык -Прак, Белоусова Ю.В., ауд. МС-34, Группа 2А, Подгруппа 1<br>
        --------<br>
        Ин.язык -Прак, Иванова Е.В., ауд. МС-42, Группа 2В, Подгруппа 1<br>
        --------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-53, Группа 2С, Подгруппа 1 &nbsp;
    </td>
    <td style='border-color: Black;'>
        Ин.язык -Прак, Белоусова Ю.В., ауд. МС-34, Группа 2А, Подгруппа 1<br>
        --------<br>
        Ин.язык -Прак, Иванова Е.В., ауд. МС-42, Группа 2В, Подгруппа 1<br>
        --------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-53, Группа 2С, Подгруппа 1 &nbsp;
    </td>
    <td style='border-color: Black;'>
        Ин.язык -Прак, Белоусова Ю.В., ауд. МС-51-к, Группа 2А, Подгруппа 2<br>
        --------<br>
        Ин.язык -Прак, Иванова Е.В., ауд. МС-42, Группа 2В, Подгруппа 2<br>
        --------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-53, Группа 2С, Подгруппа 2 &nbsp;
    </td>
    <td style='border-color: Black;'>
        Ин.язык -Прак, Белоусова Ю.В., ауд. МС-51-к, Группа 2А, Подгруппа 2<br>
        --------<br>
        Ин.язык -Прак, Иванова Е.В., ауд. МС-42, Группа 2В, Подгруппа 2<br>
        --------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-53, Группа 2С, Подгруппа 2 &nbsp;
    </td>
</tr>
</table>
`;

describe('should parse lesson common data', () => {
  test('should detect custom time', () => {
    const response = parseTable(customTimed, false);
    expect((response as SchedulesDay[])[0].lessons[0].time_start).toBe('10:00');
    expect((response as SchedulesDay[])[0].lessons[0].time_end).toBe('11:30');
  });

  test('should split english by subgroups', () => {
    const response = parseTable(englishLessons, false);
    expect((response as SchedulesDay[])[0].lessons.length).toBeGreaterThan(4);
  });
});
