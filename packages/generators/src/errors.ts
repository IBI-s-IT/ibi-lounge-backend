import createError from '@fastify/error';

export const GradesDataMismatchError = createError(
  'grades_data_mismatch',
  'Введённая фамилия не соответствует пин-коду',
  400
);

export const IbiServerDownError = createError(
  'ibi_server_down',
  'На стороне МБИ наблюдаются проблемы с подключением к серверу',
  503
);

export const SchedulesParsingError = (message: string) =>
  createError('schedules_parsing_error', message, 500);
