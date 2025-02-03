import { logger } from './logger.js';

const env = process.env['KUMA'];

export function tryKumaHook() {
  if (env) {
    logger.info(`Using ${env} as Uptime Kuma's uptime heartbeat`);

    setInterval(() => {
      try {
        logger.debug('Sending heartbeat');
        fetch(env).catch((e) => logger.error('not severe:', e));
      } catch {
        logger.error('Failed to send heartbeat!');
      }
    }, 1000 * 30);
  }
}
