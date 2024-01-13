export const schedulesRequestQuery = {
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
      description: 'Группа студента, можно найти через /list?type=groups&level=*',
    },
    teacher: {
      type: 'string',
      description: 'ID преподавателя, можно найти через /list?type=teachers',
    },
    subgroups: {
      description: 'JSON массив подгрупп',
      type: 'string',
    },
  },
  required: ['dateStart', 'dateEnd'],
  additionalProperties: false,
} as const;

const schedulesRequestSchema = {
  description: 'Выдаёт расписание группы/преподавателя',
  querystring: schedulesRequestQuery
};

export const schedulesLessonAdditional = {
  type: 'object',
  properties: {
    is_online: {
      type: 'boolean',
    },
    type: {
      type: 'string',
      enum: [
        'practice',
        'lecture',
        'library_day',
        'project_work',
        'exam',
        'subject_report',
        'consultation',
        'subject_report_with_grade'
      ],
      description:
        "practice: Практика; " +
        "lecture: Лекция; " +
        "library_day: Библиотечный день (в 2023 году не встречался); " +
        "project_work: Проектная деятельность (в 2023 году не встречался); " +
        "exam: Экзамен; " +
        "subject_report: Зачёт; " +
        "consultation: Консультация; " +
        "subject_report_with_grade: Дифференцированный зачёт"
    },
    url: { type: 'string', description: 'Ссылка' },
    group: { type: 'array', items: { type: 'string' } },
    subgroup: { type: 'array', items: { type: 'string' } },
    location: { type: 'string', description: 'Аудитория' },
    teacher_name: {
      type: 'string',
      description: 'Фамилия и инициалы преподавателя'
    },
    compensation: { type: 'string', description: 'Возмещение пары' },
    teacher_groups: {
      type: 'array',
      items: { type: 'string' },
      description: 'Группы которые будут на паре (только у учителей)'
    },
    additionalProperties: false,
  },
} as const;

export const schedulesLesson = {
  type: 'object',
  properties: {
    time_start: { type: 'string' },
    time_end: { type: 'string' },
    text: { type: 'string' },
    additional: schedulesLessonAdditional,
  },
  required: ['time_start', 'time_end', 'text'],
  additionalProperties: false,
} as const;

export const schedulesDay = {
  type: 'object',
  properties: {
    day: { type: 'string' },
    month: { type: 'string' },
    week_day: {type: 'string' },
    lessons: {
      type: 'array',
      items: schedulesLesson,
    },
  },
  required: ['day', 'month', 'week_day', 'lessons'],
  additionalProperties: false,
} as const;

const schedulesResponseSchema = {
  type: 'object',
  properties: {
    response: {
      type: 'array',
      items: schedulesDay,
    }
  }
};

export const schedulesSchema = {
  ...schedulesRequestSchema,
  response: {
    200: schedulesResponseSchema,
  }
};