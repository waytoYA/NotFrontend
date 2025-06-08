import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { Provider } from 'react-redux';
import { Root } from '@/components/Root.tsx';
import { EnvUnsupported } from '@/components/EnvUnsupported.tsx';
import { init } from '@/init.ts';
import { BrowserRouter } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import '@/styles/Base.css';
import '@/styles/Colors.css';
import '@/styles/Defaults.css';
import '@/styles/Fonts.css';
import '@/styles/Reset.css';
// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';
import { store } from './store/store.tsx';

// import { config } from 'dotenv'
// config()

const root = ReactDOM.createRoot(document.getElementById('root')!);

export const Context = createContext(null as any)

try {
  // Configure all application dependencies.
  init()

  root.render(
    <BrowserRouter> 
      <Provider store={store}>
        <TonConnectUIProvider
          manifestUrl={`${import.meta.env.VITE_CLIENT_URL}/tonconnect-manifest.json`}
          actionsConfiguration={{
            twaReturnUrl: import.meta.env.VITE_BOT_NAME,
          }}
        >
        <Root/>
        </TonConnectUIProvider>
      </Provider>
    </BrowserRouter>  
  );
} catch (e) {
  root.render(<EnvUnsupported/>);
}
