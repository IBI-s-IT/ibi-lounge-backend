import { lessonTypeMap } from '@repo/shared/lesson_type_map';
import { BotContext } from './context.js';
import { encode } from '@msgpack/msgpack';

const Strings = {
  mainPlaceholder: '⚡️ Выбери действие',
  today: '📅 Сегодня',
  tomorrow: '📆 Завтра',
  days: '🗓️ По дням',
  links: '🔗 Ссылки',
  settings: '⚙️ Настройки',
  error: (error: string) =>
    `🫥 Произошла ошибка! Код ошибки <pre>${error}</pre>`,
  noSchedules: (date: string) => `🍕 На ${date} пар нет`,
  back: '⬅️ Назад',
  greeting: (ctx: BotContext) =>
    `Привет, ${ctx.from?.username ?? 'аноним'}!

<b>Текущие настройки</b>
- Уровень образования: ${ctx.session.levelName}
- Группа: ${ctx.session.groupName}

В случае вопросов или неполадок обращаться <a href="https://t.me/gbowsky">сюда</a>`,
  settingsMenu: (ctx: BotContext) => {
    const params = [
      ctx.chat?.id,
      ctx.chat?.type,
      ctx.session.group,
      ctx.session.education_level,
    ];

    return `⚙️ <b><a href="t.me/${ctx.me.username}/settings?startapp=${params.join('_')}">Настройки</a></b>
  
Чтобы изменить группу или уровень образования нажми на кнопку "Запустить".`;
  },
  toToday: 'Сегодня',
  backwards: '◀️',
  forward: '▶️',

  ...lessonTypeMap,

  isOnline: '<i>Онлайн 🌍️</i>',
  location: (place: string) => `<i>${place} 🗺️</i>`,
  lms: '📄 ЕЭОС',
  news: '🗞️ Новости',
  employees: '👤 Педагогический состав',
  contacts: '☎️ Контакты',
  iosApp: '🍏 iOS Приложение',

  startDesc: 'Открывает главное меню',
  todayDesc: 'Отправляет расписание на сегодня',
  tomorrowDesc: 'Отправляет расписание на завтра',
  linksDesc: 'Открывает меню с полезными ссылками',
  settingsDesc: 'Открывает меню настроек для данного чата',
  dailyDesc: 'Открывает меню с расписанием по дням',
  resetSession:
    'Ваши настройки были сброшены. Причин тому может быть много, но если вы считаете это ошибкой, то напишите @gbowsky',
};

export default Strings;
