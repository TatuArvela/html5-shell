import {
  addDragEventListeners
} from './drag';
import {
  addPositionEventListeners,
  updateWindowPosition,
} from './position';
import {
  setWindowSizeAttributes
} from './size';
import {
  addStackingEventListeners,
  setActive,
} from './stacking';

export default class WindowManager {
  constructor(shell) {
    this.shell = shell;
    this.element = shell.element.querySelector('.window-manager');
  }

  initialize() {
    this.addEventListeners();
    this.initializeAllWindows();
  }

  initializeWindow(windowElement) {
    setWindowSizeAttributes(windowElement);
    /* this.shell.element.querySelectorAll('.window--resizable').forEach(window => {
      console.log("make resizable")
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
    }); */
    this.shell.formEnhancer.enhanceForms(windowElement);
  }

  initializeAllWindows() {
    this.element.querySelectorAll('.window').forEach((windowElement) => {
      this.initializeWindow(windowElement);
    });
  }

  addWindow(windowElement) {
    this.element.append(windowElement);
  }

  setActive(windowElement) {
    return setActive(windowElement);
  }

  addEventListeners() {
    addDragEventListeners(this.element, updateWindowPosition);
    addPositionEventListeners(this.element);
    addStackingEventListeners(this.element);
  }
}