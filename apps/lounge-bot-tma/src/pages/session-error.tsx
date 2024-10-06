import { Placeholder } from '@telegram-apps/telegram-ui';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const SessionError = () => {
  return (
    <Placeholder
      header="Ваша сессия устарела"
      description="Перезапустите приложение"
    >
      <DotLottieReact src="/tma/duck-oopsie.json" loop autoplay />
    </Placeholder>
  );
};
