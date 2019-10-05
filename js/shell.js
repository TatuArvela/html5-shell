import FormEnhancer from "./form-enhancer";
import ThemeManager from "./theme-manager";
import WindowManager from "./window-manager";

export default class Shell {
  constructor(element) {
    this.element = element;

    this.formEnhancer = new FormEnhancer(this);
    // WindowManager depends on FormEnhancer
    this.windowManager = new WindowManager(this);
    // ThemeManager depends on WindowManager
    this.themeManager = new ThemeManager(this);

    // FIXME: Hack for waiting for ThemeManager to load
    setTimeout(() => {
      this.windowManager.initialize();
    }, 500);

    setTimeout(() => {
      this.element.classList.add("ready");
    }, 2000);
  }
}