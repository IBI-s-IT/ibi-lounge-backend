import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@telegram-apps/telegram-ui/dist/styles.css';

import { AppRoot } from '@telegram-apps/telegram-ui';

import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppRoot>
      <BrowserRouter basename="/tma">
        <App />
      </BrowserRouter>
    </AppRoot>
  </StrictMode>
);
