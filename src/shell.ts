import ThemeManager from './ThemeManager';
import { Config, Shell as ShellType } from './types';
import WindowManager from './WindowManager';
// import FormEnhancer from './form-enhancer';

const Shell = (element: HTMLElement, config: Config): ShellType => {
  const shell: ShellType = {
    config,
    element,
  };

  // shell.formEnhancer = FormEnhancer(shell);
  shell.windowManager = WindowManager(shell);
  shell.themeManager = ThemeManager(shell, () => {
    /**
     * It is important to let ThemeManager load the initial theme
     * before initializing WindowManager. Otherwise,
     * the initial window size calculations will be wrong!
     */
    shell.windowManager.showWindow(shell.themeManager.themeSwitcher);
  });

  setTimeout(() => {
    shell.element.classList.add('ready');
  }, 2000);

  return shell;
};

export default Shell;
