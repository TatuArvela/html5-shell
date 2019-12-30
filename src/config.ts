import { Config, Theme } from './types';

const basePath = 'node_modules/html5-shell/themes/';
const themes: Theme[] = [
  {
    path: 'win-classic/win9x-16clr.css',
    title: 'Windows 9x, 16 colors',
  },
  {
    path: 'win-classic/win9x-256clr.css',
    title: 'Windows 9x, 256 colors',
  },
  {
    path: 'win-classic/win9x-16bit.css',
    title: 'Windows 9x, High Color 16-bit',
  },
  {
    path: 'win-classic/win9x-32bit.css',
    title: 'Windows 9x, True Color 32-bit',
  },
  {
    path: 'win-classic/win2k.css',
    title: 'Windows 2000',
  },
  {
    path: 'win-classic/win9x-aesthetic.css',
    title: 'ウィンドウズ',
  },
];

const config: Config = {
  themeManager: {
    basePath,
    themes,
  },
};

export default config;
