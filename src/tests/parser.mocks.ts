export const onlineEventsHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 22.04.2023 по 22.04.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>9:00-10:30&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>10:40-12:10&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>22.04 Сб&nbsp;</td><td style='border-color: Black;'>ИгрВидСпорт -Прак, Киселев З.Н., ауд. Н-202-web, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877&nbsp;</td><td style='border-color: Black;'>ИгрВидСпорт -Прак, Киселев З.Н., ауд. Н-202-web, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877&nbsp;</td></tr></table>`

export const onlineEventsReceive = [
  {
    "date": '2023-04-21T21:00:00.000Z',
    "lessons": [
      {
        "text": "ИгрВидСпорт",
        "time_start": '2023-04-22T06:00:00.000Z',
        "time_end": '2023-04-22T07:30:00.000Z',
        "additional": {
          "is_online": true,
          "type": "practice",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877",
          "location": "Н-202-web",
          "teacher_name": "Киселев З.Н."
        }
      },
      {
        "text": "ИгрВидСпорт",
        "time_start": "2023-04-22T07:40:00.000Z",
        "time_end": "2023-04-22T09:10:00.000Z",
        "additional": {
          "is_online": true,
          "type": "practice",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877",
          "location": "Н-202-web",
          "teacher_name": "Киселев З.Н."
        }
      }
    ]
  }
];

export const combinedEventsHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 20.04.2023 по 20.04.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=4 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>9:00-10:30&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>10:40-12:10&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>14:30-16:00&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>20.04 Чт&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Иванова Е.В., ауд. МС-22, ПОДГРУППА 1А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-44-к, ПОДГРУППА 1С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Иванова Е.В., ауд. МС-22, ПОДГРУППА 1А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-44-к, ПОДГРУППА 1С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 2В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-22, ПОДГРУППА 2А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-44-к, ПОДГРУППА 2С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 2В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-22, ПОДГРУППА 2А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-44-к, ПОДГРУППА 2С&nbsp;</td></tr></table>`;

export const combinedEventsReceive = [
  {
    "date": "2023-04-19T21:00:00.000Z",
    "lessons": [
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T06:00:00.000Z",
        "time_end": "2023-04-20T07:30:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["1"],
          "location": "МС-22",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T06:00:00.000Z",
        "time_end": "2023-04-20T07:30:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["1"],
          "location": "МС-44-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T07:40:00.000Z",
        "time_end": "2023-04-20T09:10:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["1"],
          "location": "МС-22",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T07:40:00.000Z",
        "time_end": "2023-04-20T09:10:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["1"],
          "location": "МС-44-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T09:50:00.000Z",
        "time_end": "2023-04-20T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["2"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T09:50:00.000Z",
        "time_end": "2023-04-20T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["2"],
          "location": "МС-22",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T09:50:00.000Z",
        "time_end": "2023-04-20T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["2"],
          "location": "МС-44-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T11:30:00.000Z",
        "time_end": "2023-04-20T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["2"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T11:30:00.000Z",
        "time_end": "2023-04-20T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["2"],
          "location": "МС-22",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-20T11:30:00.000Z",
        "time_end": "2023-04-20T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["2"],
          "location": "МС-44-к",
          "teacher_name": "Штылева Е.В."
        }
      }
    ]
  }
]

export const customTimeEventHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 18.04.2023 по 18.04.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>14:30-16:00&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>18.04 Вт&nbsp;</td><td style='border-color: Black;'>Операц.сист. -Прак, Андреев И.В., ауд. МС-34-web, <font color=red><b> НАЧАЛО В 12-00 час! </b></font><font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537&nbsp;</td><td style='border-color: Black;'>Операц.сист. -Прак, Андреев И.В., ауд. МС-34-web, <font color=red><b> НАЧАЛО В 13-30 час! </b></font><font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537&nbsp;</td></tr></table>`

export const customTimeEventReceived = [
  {
    "date": "2023-04-17T21:00:00.000Z",
    "lessons": [
      {
        "text": "Операц.сист.",
        "time_start": "2023-04-18T09:00:00.000Z",
        "time_end": "2023-04-18T10:30:00.000Z",
        "additional": {
          "is_online": true,
          "type": "practice",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537",
          "custom_time": {
            "start": "2023-04-18T09:00:00.000Z",
            "end": "2023-04-18T10:30:00.000Z"
          },
          "location": "МС-34-web",
          "teacher_name": "Андреев И.В."
        }
      },
      {
        "text": "Операц.сист.",
        "time_start": "2023-04-18T10:30:00.000Z",
        "time_end": "2023-04-18T12:00:00.000Z",
        "additional": {
          "is_online": true,
          "type": "practice",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537",
          "custom_time": {
            "start": "2023-04-18T10:30:00.000Z",
            "end": "2023-04-18T12:00:00.000Z"
          },
          "location": "МС-34-web",
          "teacher_name": "Андреев И.В."
        }
      }
    ]
  }
]

export const examEventHtml = `<center><h4>Расписание группы 401 за период с 01.02.2023 по 01.02.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>18:30-20:00&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>20:10-21:40&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'> 1.02 Ср&nbsp;</td><td style='border-color: Black;'>Корп. финансы -Экз, Мидлер Е.А., ауд. Дистанцион, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=2719&nbsp;</td><td style='border-color: Black;'>Корп. финансы -Экз, Мидлер Е.А., ауд. Дистанцион, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=2719&nbsp;</td></tr></table>`

export const examEventReceived = [
  {
    "date": "2023-01-31T21:00:00.000Z",
    "lessons": [
      {
        "text": "Корп. финансы",
        "time_start": "2023-02-01T15:30:00.000Z",
        "time_end": "2023-02-01T17:00:00.000Z",
        "additional": {
          "is_online": true,
          "type": "exam",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=2719",
          "teacher_name": "Мидлер Е.А."
        }
      },
      {
        "text": "Корп. финансы",
        "time_start": "2023-02-01T17:10:00.000Z",
        "time_end": "2023-02-01T18:40:00.000Z",
        "additional": {
          "is_online": true,
          "type": "exam",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=2719",
          "teacher_name": "Мидлер Е.А."
        }
      }
    ]
  }
]

export const lectureEventHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 07.02.2023 по 07.02.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=1 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'> 7.02 Вт&nbsp;</td><td style='border-color: Black;'>Маркетинг -Лекц, Некрасова Н.В., ауд. Н-204-web, <font color=red><b> ОНЛАЙН! </b></font>&nbsp;</td></tr></table>`;

export const lectureEventReceived = [
  {
    "date": "2023-02-06T21:00:00.000Z",
    "lessons": [
      {
        "text": "Маркетинг",
        "time_start": "2023-02-07T09:50:00.000Z",
        "time_end": "2023-02-07T11:20:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "location": "Н-204-web",
          "teacher_name": "Некрасова Н.В."
        }
      }
    ]
  }
]

export const combinedMultipleSubgroupsHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 27.04.2023 по 27.04.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=4 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>9:00-10:30&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>10:40-12:10&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>14:30-16:00&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>27.04 Чт&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 1В И ПОДГРУППА 3В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-53, ПОДГРУППА 1А и ПОДГРУППА 3А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-43-к, ПОДГРУППА 1С И ПОДГРУППА 3С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 3В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-53, ПОДГРУППА 1А и ПОДГРУППА 3А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-43-к, ПОДГРУППА 1 И ПОДГРУППА 3С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 2В и ПОДГРУППА 4В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-53, ПОДГРУППА 2А и ПОДГРУППА 4А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-43-к, ПОДГРУППА 2С И ПОДГРУППА 4С&nbsp;</td><td style='border-color: Black;'>Ин.язык -Прак, Бурчакова Н.Ю., ауд. МС-54, ПОДГРУППА 2В и ПОДГРУППА 4В<br>--------<br>Ин.язык -Прак, Иванова Е.В., ауд. МС-53, ПОДГРУППА 2А и ПОДГРУППА 4А<br>--------<br>Ин.язык -Прак, Штылева Е.В., ауд. МС-43-к, ПОДГРУППА 2С И ПОДГРУППА 4С&nbsp;</td></tr></table>`

export const combinedMultipleSubgroupsReceived = [
  {
    "date": "2023-04-26T21:00:00.000Z",
    "lessons": [
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T06:00:00.000Z",
        "time_end": "2023-04-27T07:30:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["1", "3"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T06:00:00.000Z",
        "time_end": "2023-04-27T07:30:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["1", "3"],
          "location": "МС-53",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T06:00:00.000Z",
        "time_end": "2023-04-27T07:30:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["1", "3"],
          "location": "МС-43-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T07:40:00.000Z",
        "time_end": "2023-04-27T09:10:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["3"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T07:40:00.000Z",
        "time_end": "2023-04-27T09:10:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["1", "3"],
          "location": "МС-53",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T07:40:00.000Z",
        "time_end": "2023-04-27T09:10:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["1", "3"],
          "location": "МС-43-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T09:50:00.000Z",
        "time_end": "2023-04-27T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["2", "4"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T09:50:00.000Z",
        "time_end": "2023-04-27T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["2", "4"],
          "location": "МС-53",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T09:50:00.000Z",
        "time_end": "2023-04-27T11:20:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["2", "4"],
          "location": "МС-43-к",
          "teacher_name": "Штылева Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T11:30:00.000Z",
        "time_end": "2023-04-27T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["В"],
          "subgroup": ["2", "4"],
          "location": "МС-54",
          "teacher_name": "Бурчакова Н.Ю."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T11:30:00.000Z",
        "time_end": "2023-04-27T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["А"],
          "subgroup": ["2", "4"],
          "location": "МС-53",
          "teacher_name": "Иванова Е.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-04-27T11:30:00.000Z",
        "time_end": "2023-04-27T13:00:00.000Z",
        "additional": {
          "type": "practice",
          "group": ["С"],
          "subgroup": ["2", "4"],
          "location": "МС-43-к",
          "teacher_name": "Штылева Е.В."
        }
      }
    ]
  }
];

export const subjectReportEventHtml = `<center><h4>Расписание группы 223-ПИвЭ за период с 15.11.2022 по 15.11.2022</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>18:30-20:00&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>20:10-21:40&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>15.11 Вт&nbsp;</td><td style='border-color: Black;'>Ин.язык -Зач, Сорока О.В., ауд. МС-42&nbsp;</td><td style='border-color: Black;'>Ин.язык -Зач, Сорока О.В., ауд. МС-42&nbsp;</td></tr></table>`

export const subjectReportEventReceived = [
  {
    "date": "2023-11-14T21:00:00.000Z",
    "lessons": [
      {
        "text": "Ин.язык",
        "time_start": "2023-11-15T15:30:00.000Z",
        "time_end": "2023-11-15T17:00:00.000Z",
        "additional": {
          "type": "subject_report",
          "location": "МС-42",
          "teacher_name": "Сорока О.В."
        }
      },
      {
        "text": "Ин.язык",
        "time_start": "2023-11-15T17:10:00.000Z",
        "time_end": "2023-11-15T18:40:00.000Z",
        "additional": {
          "type": "subject_report",
          "location": "МС-42",
          "teacher_name": "Сорока О.В."
        }
      }
    ]
  }
];

export const noSubjectLectureHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 13.03.2023 по 13.03.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=5 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>9:00-10:30&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>10:40-12:10&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>14:30-16:00&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>16:10-17:40&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>13.03 Пн&nbsp;</td><td style='border-color: Black;'>Экон.пр.(орг) -Лекц, Юдина О.Н., ауд. Н-202-web, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=4778&nbsp;</td><td style='border-color: Black;'>АлгорИСтр-рыДан -Лекц, Комарова Е.В., ауд. Н-204-web, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26140&nbsp;</td><td style='border-color: Black;'>Операц.сист. -Лекц, Андреев И.В., ауд. Н-202-1, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537&nbsp;</td><td style='border-color: Black;'>ВычС,Сети и Тел -Лекц, Анисимов А.В., ауд. Н-202-web, <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=19013&nbsp;</td><td style='border-color: Black;'><font color=red><b> ОНЛАЙН ЛЕКЦИЯ! </b></font>https://disk.yandex.ru/d/S0yfRtR-6g222A&nbsp;</td></tr></table>`;

export const noSubjectLectureReceived = [
  {
    "date": "2023-03-12T21:00:00.000Z",
    "lessons": [
      {
        "text": "Экон.пр.(орг)",
        "time_start": "2023-03-13T06:00:00.000Z",
        "time_end": "2023-03-13T07:30:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=4778",
          "location": "Н-202-web",
          "teacher_name": "Юдина О.Н."
        }
      },
      {
        "text": "АлгорИСтр-рыДан",
        "time_start": "2023-03-13T07:40:00.000Z",
        "time_end": "2023-03-13T09:10:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26140",
          "location": "Н-204-web",
          "teacher_name": "Комарова Е.В."
        }
      },
      {
        "text": "Операц.сист.",
        "time_start": "2023-03-13T09:50:00.000Z",
        "time_end": "2023-03-13T11:20:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537",
          "location": "Н-202-1",
          "teacher_name": "Андреев И.В."
        }
      },
      {
        "text": "ВычС,Сети и Тел",
        "time_start": "2023-03-13T11:30:00.000Z",
        "time_end": "2023-03-13T13:00:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "url": "https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=19013",
          "location": "Н-202-web",
          "teacher_name": "Анисимов А.В."
        }
      },
      {
        "text": "ЛЕКЦИЯ!",
        "time_start": "2023-03-13T13:10:00.000Z",
        "time_end": "2023-03-13T14:40:00.000Z",
        "additional": {
          "is_online": true,
          "type": "lecture",
          "url": "https://disk.yandex.ru/d/S0yfRtR-6g222A"
        }
      }
    ]
  }
];

export const subjectReportWithGradeHtml = `<center><h4>Расписание группы 123-ПИвЭ за период с 29.12.2022 по 29.12.2022</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>10:40-12:10&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>29.12 Чт&nbsp;</td><td style='border-color: Black;'>Мат.анализ -ДифЗ, Антипова Т.Б., ауд. МС-34&nbsp;</td><td style='border-color: Black;'>История_ИРос,ВИ -Конс, Кривошеев М.В., ауд. МС-31&nbsp;</td></tr></table>`;

export const subjectReportWithGradeReceived = [
  {
    "date": "2023-12-28T21:00:00.000Z",
    "lessons": [
      {
        "text": "Мат.анализ",
        "time_start": "2023-12-29T07:40:00.000Z",
        "time_end": "2023-12-29T09:10:00.000Z",
        "additional": {
          "type": "subject_report_with_grade",
          "location": "МС-34",
          "teacher_name": "Антипова Т.Б."
        }
      },
      {
        "text": "История_ИРос,ВИ",
        "time_start": "2023-12-29T09:50:00.000Z",
        "time_end": "2023-12-29T11:20:00.000Z",
        "additional": {
          "type": "consultation",
          "location": "МС-31",
          "teacher_name": "Кривошеев М.В."
        }
      }
    ]
  }
];

export const customTimeDotHtml = `<center><h4>Расписание группы 113-ПИвЭ за период с 19.06.2023 по 25.06.2023</h4></center><table border=1 cellspacing=0 cellpadding=0 style='border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;' >
                    <tr align=center>
                    <td rowspan=2 style='border-color: Black; background-color: #f6ecc8'><b>Дата</b></td>
                    <td colspan=3 style='border-color: Black; background-color: #f6ecc8'><b>Время занятий</b></td></tr><td align=center style='border-color: Black; background-color: #f6ecc8'><b>12:50-14:20&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>14:30-16:00&nbsp;</b></td><td align=center style='border-color: Black; background-color: #f6ecc8'><b>16:10-17:40&nbsp;</b></td></tr><tr style='background-color: transparent' align=center>
                            <td style='border-color: Black;'>21.06 Ср&nbsp;</td><td style='border-color: Black;'>&nbsp;</td><td style='border-color: Black;'>&nbsp;</td><td style='border-color: Black;'>ВычС,Сети и Тел -Конс, Ильина О.П., ауд. Н-202-1,  <font color=red><b> ОНЛАЙН! Начало в 17.00! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26806&nbsp;</td></tr><tr style='background-color: #faf5e3' align=center>
                            <td style='border-color: Black;'>22.06 Чт&nbsp;</td><td style='border-color: Black;'>Операц.сист. -Конс, Андреев И.В., ауд. Н-202-1,  <font color=red><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537&nbsp;</td><td style='border-color: Black;'>ВычС,Сети и Тел -Экз, Ильина О.П., ауд. Н-202-1,  <font color=red><b> ОНЛАЙН! Начало в 15.00! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26806&nbsp;</td><td style='border-color: Black;'>&nbsp;</td></tr></table>
`;

export const customTimeDotReceived = [{"date":"2023-06-20T21:00:00.000Z","lessons":[{"text":"ВычС,Сети и Тел","time_start":"2023-06-21T14:00:00.000Z","time_end":"2023-06-21T15:30:00.000Z","additional":{"is_online":true,"type":"consultation","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26806","custom_time":{"start":"2023-06-21T14:00:00.000Z","end":"2023-06-21T15:30:00.000Z"},"location":"Н-202-1","teacher_name":"Ильина О.П."}}]},{"date":"2023-06-21T21:00:00.000Z","lessons":[{"text":"Операц.сист.","time_start":"2023-06-22T09:50:00.000Z","time_end":"2023-06-22T11:20:00.000Z","additional":{"is_online":true,"type":"consultation","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26537","location":"Н-202-1","teacher_name":"Андреев И.В."}},{"text":"ВычС,Сети и Тел","time_start":"2023-06-22T12:00:00.000Z","time_end":"2023-06-22T13:30:00.000Z","additional":{"is_online":true,"type":"exam","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=26806","custom_time":{"start":"2023-06-22T12:00:00.000Z","end":"2023-06-22T13:30:00.000Z"},"location":"Н-202-1","teacher_name":"Ильина О.П."}}]}];

export const compensationHtml = `<center><h4>Расписание группы 131 за период с 08.09.2023 по 09.09.2023</h4></center><table border="1" cellspacing="0" cellpadding="0" style="border-color: Black;  border-collapse: collapse; background-color : #FFFFFF;">
                    <tbody><tr align="center">
                    <td rowspan="2" style="border-color: Black; background-color: #f6ecc8"><b>Дата</b></td>
                    <td colspan="4" style="border-color: Black; background-color: #f6ecc8"><b>Время занятий</b></td></tr><tr><td align="center" style="border-color: Black; background-color: #f6ecc8"><b>9:00-10:30&nbsp;</b></td><td align="center" style="border-color: Black; background-color: #f6ecc8"><b>10:40-12:10&nbsp;</b></td><td align="center" style="border-color: Black; background-color: #f6ecc8"><b>12:50-14:20&nbsp;</b></td><td align="center" style="border-color: Black; background-color: #f6ecc8"><b>14:30-16:00&nbsp;</b></td></tr><tr style="background-color: transparent" align="center">
                            <td style="border-color: Black;"> 9.09 Сб&nbsp;</td><td style="border-color: Black;">ИгрВидСпорт -Прак, Киселев З.Н., ауд. Н-202-1, <font color="red"><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877&nbsp;</td><td style="border-color: Black;">ИгрВидСпорт -Прак, Киселев З.Н., ауд. Н-202-1, <font color="red"><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877&nbsp;</td><td style="border-color: Black;">Макроэкономика -Лекц, Порядина И.В., ауд. Н-202-1, <font color="red"><b> ОНЛАЙН! </b></font> https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=20565&nbsp;</td><td style="border-color: Black;">ОснРосГосуд-ти -Лекц, Батищева Н.А., ауд. Н-202-1, <font color="red"><b> ОНЛАЙН! </b></font> Возмещение за 13.09.23 https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=28300&nbsp;</td></tr></tbody></table>`

export const compensationReceived = [{"date":"2023-09-08T21:00:00.000Z","lessons":[{"text":"ИгрВидСпорт","time_start":"2023-09-09T06:00:00.000Z","time_end":"2023-09-09T07:30:00.000Z","additional":{"is_online":true,"type":"practice","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877","location":"Н-202-1","teacher_name":"Киселев З.Н."}},{"text":"ИгрВидСпорт","time_start":"2023-09-09T07:40:00.000Z","time_end":"2023-09-09T09:10:00.000Z","additional":{"is_online":true,"type":"practice","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=23877","location":"Н-202-1","teacher_name":"Киселев З.Н."}},{"text":"Макроэкономика","time_start":"2023-09-09T09:50:00.000Z","time_end":"2023-09-09T11:20:00.000Z","additional":{"is_online":true,"type":"lecture","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=20565","location":"Н-202-1","teacher_name":"Порядина И.В."}},{"text":"ОснРосГосуд-ти","time_start":"2023-09-09T11:30:00.000Z","time_end":"2023-09-09T13:00:00.000Z","additional":{"is_online":true,"type":"lecture","url":"https://lms.ibispb.ru/mod/bigbluebuttonbn/view.php?id=28300","compensation":"13.09.23","location":"Н-202-1","teacher_name":"Батищева Н.А."}}]}];
