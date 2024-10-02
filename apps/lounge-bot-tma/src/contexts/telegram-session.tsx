import WebApp from '@twa-dev/sdk';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import apiClient from '../api';

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
  const value = {
    isSessionValid,
    chat,
  };

  async function validateInit() {
    if (!WebApp.initData) {
      onBadSession();
      return;
    }
    const { data } = await apiClient('/bot/validate', {
      method: 'POST',
      params: {
        init: WebApp.initData,
      },
    });
    _setSessionValid(data);
  }

  function getInit() {
    const data = WebApp.initDataUnsafe.start_param;

    if (!data) {
      onBadSession();
    }

    const chat = JSON.parse(atob(data!));
    if (!('id' in chat)) {
      throw new Error('InvalidChatData');
    }

    console.log(chat);
    _setChat(chat);
  }

  function onBadSession() {
    try {
      WebApp.showAlert(
        'Ваша сессия устарела, перезапустите приложение!',
        () => {
          WebApp.close();
        }
      );
    } catch {
      alert('Ваш браузер не поддерживается');
      window.location.href = 'about:blank';
    }
  }

  useEffect(() => {
    try {
      void validateInit();
      getInit();
    } catch {
      onBadSession();
    }
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
