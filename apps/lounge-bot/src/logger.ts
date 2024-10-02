import pino from 'pino';

export const logger = pino({
  level: 'info',
  transport: {
    targets: [
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      ...(process.env.NODE_ENV === 'development'
        ? [
            {
              target: 'pino-pretty',
              level: 'info',
              options: {
                ignore: 'pid,hostname',
                colorize: true,
                translateTime: true,
              },
            },
          ]
        : [
            {
              target: 'pino/file',
              level: 'info',
              options: {},
            },
          ]),
    ],
  },
});

export type Logger = typeof logger;
