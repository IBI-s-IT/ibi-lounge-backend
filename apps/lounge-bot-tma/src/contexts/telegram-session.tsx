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
  chat: TelegramChatDataDecoded;
};

type TelegramChatType = 'private' | 'group' | 'supergroup' | 'channel';

type TelegramChatDataEncoded =
  `${string}_${TelegramChatType}_${string}_${string}`;

type TelegramChatDataDecoded = {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  group_id: string;
  level_id: string;
};

const CHAT_DATA_FALLBACK: TelegramChatDataDecoded = {
  id: 0,
  type: 'private',
  group_id: '0',
  level_id: '0',
};

const TelegramSessionContext = createContext<TelegramSessionContextType>({
  isSessionValid: false,
  chat: CHAT_DATA_FALLBACK,
});

export const TelegramSessionProvider = ({
  children,
}: PropsWithChildren<object>) => {
  const [isSessionValid, _setSessionValid] = useState(false);
  const [chat, _setChat] =
    useState<TelegramChatDataDecoded>(CHAT_DATA_FALLBACK);
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
    const data = initData?.startParam as TelegramChatDataEncoded | undefined;
    const splittedData = data?.split('_');

    console.log(initData);

    if (!splittedData || splittedData?.length < 3) {
      onBadSession();
      return;
    }

    const [id, type, group_id, level_id] = splittedData;

    _setChat({
      id: Number(id),
      type: type as TelegramChatType,
      group_id,
      level_id,
    });
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
