## О проекте

Монорепозиторий всего связанного с получением расписания и успеваемости студентов [МБИ](https://ibispb.ru).

### Сервисы

- [`lounge-backend`](/apps/lounge-backend/README.md):
  Backend реализующий отдачу расписания (и для преподавателей и для студентов), успеваемости, списков групп, оценок, преподавателей и уровней образования.
- [`lounge-bot`](/apps/lounge-bot/README.md):
  Telegram бот позволяющий просмотривать расписание
- [`lounge-bot-tma`](/apps/lounge-bot-tma/README.md):
  Мини-приложение Telegram для настройки бота (выбор группы и уровня образования).

### Внутренние пакеты

- [`generators`](/packages/generators/):
  Здесь происходит парсинг и формирования JSON ответов
- [`api-schema`](/packages/api-schema/):
  Здесь описана схема ответов API + объекьы схемы конвертируется в типы для TypeScript
- [`shared`](/packages/shared/):
  Тут всё что не попало в остальные разделы, но переиспользуется
- [`eslint`](/packages/eslint/), [`tsconfig`](/packages/tsconfig/): тут лежат конфиги tsconfig и eslint
