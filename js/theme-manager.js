export default class ThemeManager {
  constructor(shell) {
    this.Shell = shell;
    this.loadThemes();
    this.createThemeLink();
    this.createThemeSwitcher();
  }

  loadThemes() {
    this.themesBasePath = 'node_modules/html5-win-classic-shell/themes/';
    this.themes = [];
    const defaultThemes = [{
        file: "win9x-16clr.css",
        title: "Windows 9x, 16 colors"
      },
      {
        file: "win9x-256clr.css",
        title: "Windows 9x, 256 colors"
      },
      {
        file: "win9x-16bit.css",
        title: "Windows 9x, High Color 16-bit"
      },
      {
        file: "win9x-32bit.css",
        title: "Windows 9x, True Color 32-bit"
      },
      {
        file: "win2k.css",
        title: "Windows 2000"
      },
      {
        file: "vaporwave.css",
        title: "ウィンドウズ"
      }
    ]
    defaultThemes.forEach(theme => this.themes.push({
      file: this.composeThemePath(theme.file),
      title: theme.title
    }))
  }

  composeThemePath(theme) {
    return `${this.themesBasePath}${theme}`;
  }

  setTheme(theme) {
    this.themeLink.setAttribute('href', theme);
  }

  createThemeLink() {
    let link = document.createElement("link");
    link.id = "shellTheme";
    link.href = this.themes[0].file;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    this.themeLink = link;

    // TODO: Make more versatile
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  createThemeSwitcher() {
    let themeSwitcher = document.createElement("div");
    themeSwitcher.classList.add("window")

    let windowTitle = document.createElement("div");
    windowTitle.classList.add("window__title")
    windowTitle.innerHTML = "Theme Switcher";

    let windowContent = document.createElement("div");
    windowContent.classList.add("window__content");

    let themeSelect = document.createElement("select");
    themeSelect.classList.add("form__select");
    this.themes.forEach(theme => {
      let themeOption = document.createElement("option");
      themeOption.value = theme.file;
      themeOption.innerHTML = theme.title;
      themeSelect.append(themeOption);
    });
    themeSelect.addEventListener("change", () => {
      if (event.target.value) {
        this.setTheme(event.target.value);
      }
      this.Shell.WindowManager.setActive(themeSwitcher);
    })
    windowContent.append(themeSelect);

    themeSwitcher.append(windowTitle);
    themeSwitcher.append(windowContent);

    this.Shell.WindowManager.addWindow(themeSwitcher);
  }
}