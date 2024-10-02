import { redisInstance } from './main';
import { BotContext } from './context';
import { BOT_DEFAULT_SESSION } from './consts';
import Strings from './strings';

export async function cachedRequest<T>(
  key: string,
  fetchData: () => Promise<T>,
  ttl: number = 3600 * 12,
  retryN: number = 0
): Promise<T> {
  let cached = await redisInstance.get(key);

  if (
    cached === null ||
    cached.length === 0 ||
    (JSON.parse(cached) !== null && 'error' in JSON.parse(cached)) ||
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env['NO_CACHE'] === '1'
  ) {
    const data: unknown = await fetchData();

    if ('name' in (data as Error)) {
      if (retryN > 4) {
        throw new Error('Did not succeed at fetching new data', {
          cause: `DATA: ${JSON.stringify(data)}\n\nKEY: ${key}`,
        });
      }
      return cachedRequest(key, fetchData, ttl, retryN + 1);
    }

    cached = JSON.stringify(data);
    redisInstance.set(key, cached, 'EX', ttl);
  }

  return JSON.parse(cached) as T;
}

export function checkForValidContext(ctx: BotContext) {
  if (!ctx.session?.customDate) {
    void ctx.reply(Strings.resetSession);
    ctx.session = BOT_DEFAULT_SESSION;
    return false;
  }

  return true;
}
