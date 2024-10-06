import { pino } from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      {
        target: 'pino/file',
        level: 'info',
        options: {},
      },
    ]
  },
});

export type Logger = typeof logger;
