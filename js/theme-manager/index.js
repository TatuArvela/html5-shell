import {
  loadThemes
} from './theme-loader';
import {
  createThemeSwitcher
} from './theme-switcher';

export default class ThemeManager {
  constructor(shell) {
    this.shell = shell;
    this.themes = loadThemes();
    this.createThemeLink();
    this.spawnThemeSwitcher();
  }

  createThemeLink() {
    let link = document.createElement("link");
    link.id = "shellTheme";
    link.href = this.themes[0].file;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    this.themeLink = link;

    // TODO: Make this more versatile
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  setTheme(themeLink, theme) {
    themeLink.setAttribute('href', theme);
  }

  spawnThemeSwitcher() {
    const themeSwitcher = createThemeSwitcher(this.themes, (theme) => this.setTheme(this.themeLink, theme));
    this.shell.windowManager.addWindow(themeSwitcher);
    this.shell.windowManager.setActive(themeSwitcher);
  }
}