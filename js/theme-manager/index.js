import {
  loadThemes
} from './theme-loader';
import {
  spawnThemeSwitcher
} from './theme-switcher';
import {
  createThemeLink
} from './theme-link';

const ThemeManager = (shell, onLoad) => {
  const themes = loadThemes();
  const themeLink = createThemeLink(document, themes[0].file, onLoad);

  const setTheme = (theme) => {
    themeLink.setAttribute('href', theme);
  }

  spawnThemeSwitcher(shell, themes, setTheme);

  return {
    shell,
    themes,
    themeLink,
  }
};

export default ThemeManager;