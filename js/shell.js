import WindowManager from "./window-manager";
import ThemeManager from "./theme-manager";
import FormEnhancer from "./form-enhancer";

export default class Shell {
  constructor(element) {
    this.element = element;
    this.eventOperationMemory = {};

    this.FormEnhancer = new FormEnhancer(this);
    this.WindowManager = new WindowManager(this);
    this.ThemeManager = new ThemeManager(this);
    setTimeout(() => {
      this.WindowManager.initialize();
    }, 500);

    setTimeout(() => {
      this.element.classList.add("ready");
    }, 2000);
  }
}