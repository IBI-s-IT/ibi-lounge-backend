import { FastifyInstance, FastifyRequest } from 'fastify';
import { validateInit } from '../../lib/validateTelegramInit';
import {
  botSettingsSchema,
  BotValidateQuery,
  BotSettingsQuery,
  botValidateSchema,
} from '@repo/api-schema';
import { SessionData } from '@repo/shared';

type BotValidateRequest = FastifyRequest<{
  Querystring: BotValidateQuery;
}>;

type BotSettingsRequest = FastifyRequest<{
  Querystring: BotSettingsQuery;
}>;

type StartParam = {
  id: number;
};

export default async function (fastify: FastifyInstance) {
  fastify.post(
    '/bot/validate',
    { schema: botValidateSchema },
    async (request: BotValidateRequest) => {
      return validateInit(request.query.init);
    }
  );

  fastify.post(
    '/bot/settings',
    { schema: botSettingsSchema },
    async (request: BotSettingsRequest) => {
      const { group, level, init } = request.query;

      if (!validateInit(init)) {
        return { response: false };
      }

      const data = new URLSearchParams(init);
      const params = data.get('start_param');

      if (!params) {
        return { response: false };
      }

      const decodedParams = JSON.parse(atob(params)) as StartParam;
      const redisKey = `schedules_bot${decodedParams.id}`;

      const currentSession = await fastify.redis.get(redisKey);
      if (!currentSession) {
        return { response: false };
      }

      const parsedSession = JSON.parse(currentSession) as SessionData;
      parsedSession.group = group;
      parsedSession.education_level = level;

      console.log(parsedSession);

      const result = await fastify.redis.set(
        redisKey,
        JSON.stringify(parsedSession)
      );

      return { response: result === 'OK' };
    }
  );
}
