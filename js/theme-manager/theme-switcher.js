const createThemeSwitcher = (themes, setTheme) => {
  let themeSwitcher = document.createElement("div");
  themeSwitcher.classList.add("window")

  let windowTitle = document.createElement("div");
  windowTitle.classList.add("window__title")
  windowTitle.innerHTML = "Theme Switcher";

  let windowContent = document.createElement("div");
  windowContent.classList.add("window__content");

  let themeSelect = document.createElement("select");
  themeSelect.classList.add("form__select");
  themes.forEach(theme => {
    let themeOption = document.createElement("option");
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

export {
  createThemeSwitcher
};