import { BotContext } from '@bot/context';
import { lessonTypeMap } from '@shared/type_map';

const Strings = {
  mainPlaceholder: '⚡️ Выбери действие',
  eduLevel: '🎓️ Выбрать уровень образования',
  eduLevelMenu:
    '⚙️ Выбери свой <b>уровень образования</b>\n\nОн понадобится чтобы найти свою группу',
  group: '👥 Выбрать группу',
  groupMenu: '⚙️ Выбери свою <b>группу</b>\n\nЭто нужно чтобы видеть свои пары',
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
    `⚡️ Привет, ${ctx.from?.username ?? 'аноним'}!\n\nЕсли пользуешься ботом <b>впервые</b>, то зайди в настройки и установи свои уровень образования и группу!`,
  settingsMenu: (ctx: BotContext) =>
    `⚙️ <b>Настройки</b>\n\nСейчас у тебя установлена группа <code>${
      ctx.session.groupName ?? '113-ПИвЭ'
    }</code> и уровень образования <code>${
      ctx.session.levelName ?? 'бакалавриат'
    }</code>\n\nТут может отображаться неверная информация о текущей группе/уровне образования, но расписание будет верным при условии что ты раньше пользовался ботом.\n\nЧтобы это исправить просто заново выставьте настройки.`,
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
