import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

export const openApiSchemaDescription: Partial<
  OpenAPIV3.Document | OpenAPIV3_1.Document
> = {
  info: {
    title: 'IBI Lounge Backend',
    description: 'Бекенд для получения расписания и прочего в удобном формате',
    version: '2.0.0',
  },
  tags: [
    {
      name: 'Списки',
      description: 'Получение списков с данными нужными для других запросов',
    },
    {
      name: 'Расписание',
      description: 'Получение расписания',
    },
    {
      name: 'Оценки',
      description: 'Получение оценок',
    },
  ],
};
