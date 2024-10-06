import { FastifyInstance, FastifyRequest } from 'fastify';
import { validateInit } from '../../lib/validateTelegramInit.js';
import {
  botSettingsSchema,
  BotValidateQuery,
  BotSettingsQuery,
  botValidateSchema,
} from '@repo/api-schema/bot';
import { SessionData } from '@repo/shared/bot_session';
import {
  generateGroups,
  generateLevels,
  IbiServerDownError,
} from '@repo/generators';
import { ListEntry } from '@repo/api-schema/list';

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
  fastify.get(
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

      const levels = await generateLevels();
      const groups = await generateGroups({ level });

      if (
        levels instanceof IbiServerDownError ||
        groups instanceof IbiServerDownError
      ) {
        return { response: false };
      }

      const levelName = (levels as ListEntry[]).find(
        (levelFull) => levelFull?.id === level
      )?.name;

      const groupName = (groups as ListEntry[]).find(
        (groupFull) => groupFull?.id === group
      )?.name;

      console.log(levelName, groupName);

      if (levelName) parsedSession.levelName = levelName;
      if (groupName) parsedSession.groupName = groupName;

      const result = await fastify.redis.set(
        redisKey,
        JSON.stringify(parsedSession)
      );

      return { response: result === 'OK' };
    }
  );
}
