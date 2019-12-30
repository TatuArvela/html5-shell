import { Config, Shell as ShellType } from './types';
import ThemeManager from './theme-manager';
import WindowManager from './window-manager';
// import FormEnhancer from './form-enhancer';

const Shell = (element: HTMLElement, config: Config): ShellType => {
  const shell: ShellType = {
    config,
    element,
  };

  // shell.formEnhancer = FormEnhancer(shell);
  shell.windowManager = WindowManager(shell);
  shell.themeManager = ThemeManager(shell, () =>
    shell.windowManager.initialize()
  );

  setTimeout(() => {
    shell.element.classList.add('ready');
  }, 2000);

  return shell;
};

export default Shell;
