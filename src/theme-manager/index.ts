import { Shell, ThemeManager as ThemeManagerType } from '../types';
import createThemeLink from './link-element';
import createThemeSwitcher from './switcher-element';
import loadThemes from './path-mapper';

const ThemeManager = (
  shell: Shell,
  onLoad: EventListener
): ThemeManagerType => {
  const themes = loadThemes(shell.config);

  const themeLink = createThemeLink(document, themes[0].path, onLoad);

  const setTheme = (themeFilePath: string) => {
    themeLink.setAttribute('href', themeFilePath);
  };
  createThemeSwitcher(themes, setTheme);

  return {
    shell,
    themes,
    themeLink,
  };
};

export default ThemeManager;
