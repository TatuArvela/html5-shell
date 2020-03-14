import { Shell, ThemeManager as ThemeManagerType } from '../types';
import loadThemes from './pathMapper';
import ThemeLink from './ThemeLink';
import ThemeSwitcher from './ThemeSwitcher';

const setTheme = (themeLink: Element) => (themeFilePath: string) => {
  themeLink.setAttribute('href', themeFilePath);
};

const ThemeManager = (
  shell: Shell,
  onLoad: EventListener
): ThemeManagerType => {
  const themes = loadThemes(shell.config);

  const themeLink = ThemeLink(document, themes[0].path, onLoad);
  document.getElementsByTagName('head')[0].appendChild(themeLink);

  const themeSwitcher = ThemeSwitcher(themes, setTheme(themeLink));

  return {
    shell,
    themeLink,
    themes,
    themeSwitcher,
  };
};

export default ThemeManager;
