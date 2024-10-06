import { useTelegramSession } from '../contexts/telegram-session';
import {
  Avatar,
  Banner,
  Button,
  Divider,
  FixedLayout,
  Link,
  List,
  Placeholder,
  Section,
  Select,
  Snackbar,
} from '@telegram-apps/telegram-ui';
import { FormEvent, useEffect, useState } from 'react';
import { BotSettingsResponse } from '@repo/api-schema/bot';
import { ListEntry } from '@repo/api-schema/list';
import apiClient from '../api';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './settings.module.css';
import { closeMiniApp, useLaunchParams } from '@telegram-apps/sdk-react';

export const Settings = () => {
  const { initDataRaw } = useLaunchParams();
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
  const [selectedLevel, setLevel] = useState(chat.level_id);
  const [selectedGroup, setGroup] = useState(chat.group_id);
  const [isGroupsLoading, setGroupsLoading] = useState(true);
  const [snackbarShown, setSnackbarShown] = useState(false);

  async function getLevels() {
    const { data } = await apiClient('/levels', {});
    if (!('length' in data)) {
      return;
    }

    setLevels(data);
  }

  async function getGroups() {
    setGroupsLoading(true);
    const { data } = await apiClient('/groups', {
      params: {
        level: selectedLevel,
      },
    });
    if (!('length' in data)) {
      return;
    }

    setGroups(data);
    setGroupsLoading(false);
  }

  async function applySettings(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputs = e.currentTarget.elements;
    const group = inputs.namedItem('group') as HTMLSelectElement;
    const level = inputs.namedItem('level') as HTMLSelectElement;

    const { data } = await apiClient<BotSettingsResponse>('bot/settings', {
      method: 'POST',
      params: {
        group: group.value,
        level: level.value,
        init: initDataRaw,
      },
    });

    if (data.response) {
      setSnackbarShown(true);
    }
  }

  useEffect(() => {
    void getLevels();
  }, []);

  useEffect(() => {
    void getGroups();
  }, [selectedLevel]);

  return (
    <List>
      <Placeholder
        header="Это настройки"
        description="Здесь вы можете выбрать уровень образования и/или группу в вашем чате"
      >
        <DotLottieReact autoplay loop src="/tma/utya-personal.json" />
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
        <form onSubmit={applySettings}>
          <Select
            name="level"
            value={selectedLevel}
            onChange={(e) => setLevel(e.target.value)}
            header="Уровень образования"
            className={styles.select}
          >
            {levels.map((lvl) => (
              <option key={`lvl-${lvl.id}`} value={lvl.id}>
                {lvl.name}
              </option>
            ))}
          </Select>
          <Select
            name="group"
            disabled={isGroupsLoading}
            value={selectedGroup}
            onChange={(e) => setGroup(e.target.value)}
            header="Группа"
            className={styles.select}
          >
            {groups.map((grp) => (
              <option key={`grp-${grp.id}`} value={grp.id}>
                {grp.name}
              </option>
            ))}
          </Select>
          {(chat.group_id !== selectedGroup ||
            chat.level_id !== selectedLevel) && (
            <>
              <div className={styles.submitInset} />
              <FixedLayout className={styles.submitContainer} vertical="bottom">
                <Divider />
                <Button
                  loading={isGroupsLoading}
                  className={styles.submit}
                  stretched
                  type="submit"
                >
                  Применить
                </Button>
              </FixedLayout>
            </>
          )}
        </form>
      </Section>
      {snackbarShown && (
        <Snackbar
          before={
            <DotLottieReact
              width={32}
              height={32}
              autoplay
              loop
              src="/tma/utya-personal.json"
            />
          }
          link={<Link onClick={() => closeMiniApp()}>Выход</Link>}
          onClose={() => setSnackbarShown(false)}
        >
          Записали группу{' '}
          {groups.find((g) => g.id === selectedGroup)?.name ?? 'Неизвестно'} и
          уровень образования{' '}
          {levels.find((l) => l.id === selectedLevel)?.name ?? 'Неизвестно'}!
        </Snackbar>
      )}
    </List>
  );
};
