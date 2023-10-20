import { BotContext } from "./context";

const Strings = {
  mainPlaceholder: "⚡️ Выбери действие",
  eduLevel: "🎓️ Выбрать уровень образования",
  eduLevelMenu:
    "⚙️ Выбери свой <b>уровень образования</b>\n\nОн понадобится чтобы найти свою группу",
  group: "👥 Выбрать группу",
  groupMenu: "⚙️ Выбери свою <b>группу</b>\n\nЭто нужно чтобы видеть свои пары",
  today: "📅 Сегодня",
  tomorrow: "📆 Завтра",
  days: "🗓️ По дням",
  links: "🔗 Ссылки",
  settings: "⚙️ Настройки",
  error: (error: string) =>
    `🫥 Произошла ошибка! Код ошибки <code>${error}</code>`,
  noSchedules: (date: string) => `🍕 На ${date} пар нет`,
  back: "⬅️ Назад",
  greeting: (ctx: BotContext) =>
    `⚡️ Привет, ${ctx.from.username}!\n\nЕсли пользуешься ботом <b>впервые</b>, то зайди в настройки и установи свои уровень образования и группу!`,
  settingsMenu: (ctx: BotContext) =>
    `⚙️ <b>Настройки</b>\n\nСейчас у тебя установлена группа <code>${
      ctx.session.groupName ?? "113-ПИвЭ"
    }</code> и уровень образования <code>${
      ctx.session.levelName ?? "бакалавриат"
    }</code>`,
  toToday: "Сегодня",
  backwards: "◀️",
  forward: "▶️",

  practice: "Практика",
  lecture: "Лекция",
  library_day: "Библ. день",
  project_work: "Проект. деят.",
  exam: "🚨 Экзамен",
  subject_report: "⚠️ Зачёт",
  consultation: "ℹ️ Консультация",
  subject_report_with_grade: "⚠️ Диф. зачёт",

  isOnline: "<i>Онлайн 🌍️</i>",
  location: (place: string) => `<i>${place} 🗺️</i>`,
  lms: "📄 ЕЭОС",
  news: "🗞️ Новости",
  employees: "👤 Педагогический состав",
  contacts: "☎️ Контакты",

  startDesc: "Открывает главное меню",
  todayDesc: "Отправляет расписание на сегодня",
  tomorrowDesc: "Отправляет расписание на завтра",
  linksDesc: "Открывает меню с полезными ссылками",
  settingsDesc: "Открывает меню настроек для данного чата",
  dailyDesc: "Открывает меню с расписанием по дням",
};

export default Strings;
