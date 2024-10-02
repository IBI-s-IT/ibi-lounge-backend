import { Route, Routes } from 'react-router-dom';
import { Settings } from './pages/settings';
import { useTelegramSession } from './contexts/telegram-session';
import { SessionError } from './pages/session-error';

export function App() {
  const { isSessionValid } = useTelegramSession();
  return (
    <Routes location={!isSessionValid ? '/session-error' : undefined}>
      <Route path="/" element={<Settings />} />
      <Route path="/session-error" element={<SessionError />} />
    </Routes>
  );
}

export default App;
