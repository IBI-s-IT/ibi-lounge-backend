export const schedulesQuery = {
  type: 'object',
  properties: {
    dateStart: {
      type: 'string',
      description: 'Дата формата ДД.ММ.ГГГГ',
    },
    dateEnd: {
      type: 'string',
      description: 'Дата формата ДД.ММ.ГГГГ',
    },
    group: {
      type: 'string',
      description: 'ID группы, можно найти через /groups&level=*',
    },
    teacher: {
      type: 'string',
      description: 'ID преподавателя, можно найти через /teachers',
    },
    subgroups: {
      description:
        'Массив объектов подгрупп: [{ subject: "string", group: "string", subgroup: "string" }]',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          subject: { type: 'string' },
          group: { type: 'string' },
          subgroup: { type: 'string' },
        },
        required: ['subject', 'group', 'subgroup'],
      },
    },
  },
  anyOf: [
    { required: ['dateStart', 'dateEnd', 'group'] },
    { required: ['dateStart', 'dateEnd', 'teacher'] },
  ],
  additionalProperties: false,
} as const;

const schedulesRequestSchema = {
  description: 'Выдаёт расписание группы или преподавателя в JSON формате',
  querystring: schedulesQuery,
};

export const lessonAdditional = {
  type: 'object',
  required: ['type'],
  properties: {
    is_online: {
      type: 'boolean',
    },
    type: {
      type: 'string',
      enum: [
        'unknown',
        'practice',
        'lecture',
        'library_day',
        'project_work',
        'exam',
        'subject_report',
        'consultation',
        'subject_report_with_grade',
        'course_work_defend',
      ],
      description:
        'unknown: Неизвестно; ' +
        'practice: Практика; ' +
        'lecture: Лекция; ' +
        'library_day: Библиотечный день (в 2023 году не встречался); ' +
        'project_work: Проектная деятельность (в 2023 году не встречался); ' +
        'exam: Экзамен; ' +
        'subject_report: Зачёт; ' +
        'consultation: Консультация; ' +
        'subject_report_with_grade: Дифференцированный зачёт; ' +
        'course_work_defend: Защита курсовых работ;',
      additionalProperties: false,
    },
    url: { type: 'string', description: 'Ссылка' },
    group: { type: 'array', items: { type: 'string' } },
    subgroup: { type: 'array', items: { type: 'string' } },
    classroom: { type: 'string', description: 'Аудитория (простой вариант)' },
    teacher_name: {
      type: 'string',
      description: 'Фамилия и инициалы преподавателя',
    },
    compensation: { type: 'string', description: 'Возмещение пары' },
    teacher_groups: {
      type: 'array',
      items: { type: 'string' },
      description: 'Группы которые будут на паре (только у учителей)',
    },
    classroom_details: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        classroom_number: { type: 'string' },
        computer_classroom: { type: 'boolean' },
        online_classroom: { type: 'boolean' },
      },
      description: 'Аудитория (расширенный вариант)',
      additionalProperties: false,
    },
  },
} as const;

export const lesson = {
  type: 'object',
  properties: {
    time_start: { type: 'string' },
    time_end: { type: 'string' },
    text: { type: 'string' },
    additional: lessonAdditional,
  },
  required: ['time_start', 'time_end', 'text'],
  additionalProperties: false,
} as const;

export const schedulesDay = {
  type: 'object',
  properties: {
    day: { type: 'string' },
    month: { type: 'string' },
    week_day: { type: 'string' },
    lessons: {
      type: 'array',
      items: lesson,
    },
  },
  required: ['day', 'month', 'week_day', 'lessons'],
  additionalProperties: false,
} as const;

const schedulesResponseSchema = {
  type: 'array',
  items: schedulesDay,
};

export const schedulesSchema = {
  ...schedulesRequestSchema,
  tags: ['Расписание'],
  response: {
    200: schedulesResponseSchema,
  },
};
