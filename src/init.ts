import {
  backButton,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
  isTMA,
  viewport
} from '@telegram-apps/sdk-react';

export function init(): void {
  try {
    if (!isTMA()) return;
    initSDK();

    backButton.mount();
    if (miniApp.mountSync.isSupported()) miniApp.mountSync()
    if (themeParams.mountSync.isAvailable()) themeParams.mountSync()
    initData.restore();
    void viewport
      .mount()
      .then(() => { viewport.bindCssVars(); });

    miniApp.bindCssVars();
    themeParams.bindCssVars();
  } catch (e) {
    console.log('Telegram SDK init error', e)
  }
}