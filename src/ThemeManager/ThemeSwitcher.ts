import { Theme } from '../types';
import createWindow from '../WindowManager/createWindow';

const createThemeSelect = (
  themes: Theme[],
  setTheme: (path: string) => void
) => {
  const select = document.createElement('select');
  select.classList.add('form__select');
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.path;
    option.innerHTML = theme.title;
    select.append(option);
  });
  select.addEventListener('change', event => {
    const { value } = <HTMLInputElement>event.target;
    if (value) {
      setTheme(value);
    }
  });
  return select;
};

const ThemeSwitcher = (themes: Theme[], setTheme: (path: string) => void) => {
  const themeSwitcher = createWindow('Theme Switcher', [
    createThemeSelect(themes, setTheme),
  ]);
  return themeSwitcher;
};

export default ThemeSwitcher;
