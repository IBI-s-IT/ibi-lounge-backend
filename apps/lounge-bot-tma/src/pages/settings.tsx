import WebApp from '@twa-dev/sdk';
import { useTelegramSession } from '../contexts/telegram-session';
import {
  Avatar,
  Banner,
  List,
  Placeholder,
  Section,
  Select,
} from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import { ListEntry, BotSettingsResponse } from '@repo/api-schema';
import apiClient from '../api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Settings = () => {
  const { chat } = useTelegramSession();
  const chatName = chat.title ?? chat.username;
  const chatTypeLocalized =
    chat.type === 'private'
      ? 'Личные сообщения'
      : chat.type === 'group'
        ? 'Группа'
        : chat.type === 'channel'
          ? 'Канал'
          : 'Супер-группа';
  const [levels, setLevels] = useState<ListEntry[]>([]);
  const [groups, setGroups] = useState<ListEntry[]>([]);
  const [level, setLevel] = useState<string>(chat.level_id);
  const [group, setGroup] = useState<string>(chat.group_id);

  async function getLevels() {
    const { data } = await apiClient('/levels', {});
    if (!('length' in data)) {
      return;
    }

    setLevels(data);
  }

  async function getGroups() {
    const { data } = await apiClient('/groups', {
      params: {
        level,
      },
    });
    if (!('length' in data)) {
      return;
    }

    setGroups(data);
  }

  useEffect(() => {
    WebApp.MainButton.setText('Применить');
    void getLevels();
  }, [chat]);

  useEffect(() => {
    void getGroups();
  }, [level]);

  useEffect(() => {
    if (chat.level_id !== level || chat.group_id !== group) {
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }

    WebApp.MainButton.onClick(async () => {
      WebApp.MainButton.showProgress();
      const { data } = await apiClient<BotSettingsResponse>('bot/settings', {
        method: 'POST',
        params: {
          group,
          level,
          init: WebApp.initData,
        },
      });

      if (data.response) {
        WebApp.MainButton.hideProgress();
        WebApp.close();
      }
    });
  }, [level, group, chat]);

  return (
    <List>
      <Placeholder
        header="Это настройки"
        description="Здесь вы можете выбрать уровень образования и/или группу в вашем чате"
      >
        <DotLottieReact autoplay loop src="/utya-personal.json" />
      </Placeholder>
      <Section
        header="Выбранный чат"
        footer="Чтобы открыть настройки другого чата введите в нём команду /settings"
      >
        <Banner
          before={
            <Avatar
              size={40}
              acronym={chatName!.substring(0, 2).toUpperCase()}
            />
          }
          header={chatName}
          description={chatTypeLocalized}
        />
      </Section>
      <Section header="Настройки">
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          header="Уровень образования"
        >
          {levels.map((lvl) => (
            <option key={`lvl-${lvl.id}`} value={lvl.id}>
              {lvl.name}
            </option>
          ))}
        </Select>
        <Select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          header="Группа"
        >
          {groups.map((grp) => (
            <option key={`grp-${grp.id}`} value={grp.id}>
              {grp.name}
            </option>
          ))}
        </Select>
      </Section>
    </List>
  );
};
