import FormEnhancer from "./form-enhancer";
import ThemeManager from "./theme-manager";
import WindowManager from "./window-manager";

const Shell = (element) => {
  let shell = {
    element,
  };

  shell.formEnhancer = FormEnhancer(shell);
  shell.windowManager = WindowManager(shell);
  shell.themeManager = ThemeManager(shell, () => shell.windowManager.initialize());

  setTimeout(() => {
    shell.element.classList.add("ready");
  }, 2000);

  return shell;
}

export default Shell;