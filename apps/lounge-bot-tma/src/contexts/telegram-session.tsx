import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import apiClient from '../api';
import {
  useLaunchParams,
  popup,
  closeMiniApp,
  isTMA,
} from '@telegram-apps/sdk-react';

type TelegramSessionContextType = {
  isSessionValid: boolean;
  chat: TelegramChatData;
};

type TelegramChatData = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  group_id: string;
  level_id: string;
};

const CHAT_DATA_FALLBACK: TelegramChatData = {
  id: 0,
  type: 'private',
  username: 'noname',
  group_id: '2352',
  level_id: '1',
};

const TelegramSessionContext = createContext<TelegramSessionContextType>({
  isSessionValid: false,
  chat: CHAT_DATA_FALLBACK,
});

export const TelegramSessionProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [isSessionValid, _setSessionValid] = useState(false);
  const [chat, _setChat] = useState<TelegramChatData>(CHAT_DATA_FALLBACK);
  const { initData, initDataRaw } = useLaunchParams();
  const value = {
    isSessionValid,
    chat,
  };

  async function validateInit() {
    if (!isTMA('simple')) {
      onBadSession();
      return;
    }

    if (!initData) {
      onBadSession();
      return;
    }
    const { data } = await apiClient('/bot/validate', {
      params: {
        init: initDataRaw,
      },
    });
    _setSessionValid(data);
  }

  function getInit() {
    const data = initData?.startParam;

    if (!data) {
      onBadSession();
      return;
    }

    const chat = JSON.parse(atob(data!));
    if (!('id' in chat)) {
      throw new Error('InvalidChatData');
    }

    console.log(chat);
    _setChat(chat);
  }

  function onBadSession() {
    popup
      .open({ message: 'Ваша сессия устарела, перезапустите приложение!' })
      .then(() => {
        closeMiniApp();
      });
  }

  useEffect(() => {
    void validateInit();
    getInit();
  }, []);

  return (
    <TelegramSessionContext.Provider value={value}>
      {children}
    </TelegramSessionContext.Provider>
  );
};

export function useTelegramSession() {
  return useContext(TelegramSessionContext);
}
