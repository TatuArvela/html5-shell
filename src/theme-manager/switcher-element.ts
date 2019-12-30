import { Theme } from '../types';

const createThemeSwitcher = (
  themes: Theme[],
  setTheme: (path: string) => void
) => {
  const themeSwitcher = document.createElement('div');
  themeSwitcher.classList.add('window');

  const windowTitle = document.createElement('div');
  windowTitle.classList.add('window__title');
  windowTitle.innerHTML = 'Theme Switcher';

  const windowContent = document.createElement('div');
  windowContent.classList.add('window__content');

  const themeSelect = document.createElement('select');
  themeSelect.classList.add('form__select');
  themes.forEach(theme => {
    const themeOption = document.createElement('option');
    themeOption.value = theme.path;
    themeOption.innerHTML = theme.title;
    themeSelect.append(themeOption);
  });
  themeSelect.addEventListener('change', event => {
    const { value } = <HTMLInputElement>event.target;
    if (value) {
      setTheme(value);
    }
  });
  windowContent.append(themeSelect);

  themeSwitcher.append(windowTitle);
  themeSwitcher.append(windowContent);

  return themeSwitcher;
};

// TODO: Make function in WindowManager
/* const spawnThemeSwitcher = (shell, themes, setTheme) => {
  const themeSwitcher = createThemeSwitcher(themes, setTheme);
  shell.windowManager.addWindow(themeSwitcher);
  shell.windowManager.setActive(themeSwitcher);
}; */

export default createThemeSwitcher;
