import { Route, Routes } from 'react-router-dom';
import { Settings } from './pages/settings';
import { TelegramSessionProvider } from './contexts/telegram-session';
import { SessionError } from './pages/session-error';
import { isTMA } from '@telegram-apps/sdk-react';

export function App() {
  return (
    <Routes location={!isTMA('simple') ? '/no-browser' : undefined}>
      <Route
        path="/"
        element={
          <TelegramSessionProvider>
            <Settings />
          </TelegramSessionProvider>
        }
      />
      <Route path="/session-error" element={<SessionError />} />
      <Route
        path="/no-browser"
        element={<pre style={{ color: 'black' }}>not allowed</pre>}
      />
    </Routes>
  );
}

export default App;
