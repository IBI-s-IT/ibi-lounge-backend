export const gradesQuery = {
  type: 'object',
  properties: {
    pin: { type: 'string', maxLength: 5, minLength: 5 },
    last_name: { type: 'string', minLength: 2 },
  },
  required: ['pin', 'last_name'],
} as const;

export const gradesRequestSchema = {
  description: 'Выдаёт список оценок студента',
  querystring: gradesQuery,
};

export const gradesGrade = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: {
      type: 'string',
      enum: [
        'subject_report_with_grade',
        'subject_report',
        'exam',
        'online_course_work',
        'offline_course_work',
        'unknown',
      ],
    },
    grade: {
      type: 'string',
      enum: [
        'failed',
        'passed',
        'absence',
        'not_admitted',
        '2',
        '3',
        '4',
        '5',
        'unknown',
      ],
    },
  },
} as const;

export const gradesResponseSchema = {
  type: 'object',
  properties: {
    response: {
      type: 'array',
      items: gradesGrade,
    },
  },
};

export const gradesSchema = {
  ...gradesRequestSchema,
  response: {
    200: gradesResponseSchema,
  },
};
