const createThemeSwitcher = (themes, setTheme) => {
  const themeSwitcher = document.createElement("div");
  themeSwitcher.classList.add("window")

  const windowTitle = document.createElement("div");
  windowTitle.classList.add("window__title")
  windowTitle.innerHTML = "Theme Switcher";

  const windowContent = document.createElement("div");
  windowContent.classList.add("window__content");

  const themeSelect = document.createElement("select");
  themeSelect.classList.add("form__select");
  themes.forEach(theme => {
    const themeOption = document.createElement("option");
    themeOption.value = theme.file;
    themeOption.innerHTML = theme.title;
    themeSelect.append(themeOption);
  });
  themeSelect.addEventListener("change", () => {
    if (event.target.value) {
      setTheme(event.target.value);
    }
  })
  windowContent.append(themeSelect);

  themeSwitcher.append(windowTitle);
  themeSwitcher.append(windowContent);

  return themeSwitcher;
}

const spawnThemeSwitcher = (shell, themes, setTheme) => {
  const themeSwitcher = createThemeSwitcher(themes, setTheme);
  shell.windowManager.addWindow(themeSwitcher);
  shell.windowManager.setActive(themeSwitcher);
}

export {
  spawnThemeSwitcher
};