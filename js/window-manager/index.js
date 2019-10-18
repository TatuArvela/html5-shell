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

const WindowManager = shell => {
  const element = shell.element.querySelector('.window-manager');

  const addWindow = windowElement => {
    element.append(windowElement);
  };

  const initializeWindow = windowElement => {
    setWindowSizeAttributes(windowElement);
    /* element.querySelectorAll('.window--resizable').forEach(window => {
      console.log("make resizable")
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
    }); */
    shell.formEnhancer.enhanceForms(windowElement);
  }

  const initializeAllWindows = () => {
    element.querySelectorAll('.window').forEach(windowElement => {
      initializeWindow(windowElement);
    });
  }

  const addEventListeners = () => {
    addDragEventListeners(element, updateWindowPosition);
    addPositionEventListeners(element);
    addStackingEventListeners(element);
  }

  const initialize = () => {
    addEventListeners();
    initializeAllWindows();
  };

  return {
    shell,
    element,
    initialize,
    initializeWindow,
    initializeAllWindows,
    addWindow,
    addEventListeners,
    setActive,
  }
}

export default WindowManager;