import { Shell, WindowManager as WindowManagerType } from '../types';
import createWindow from './createWindow';
import { addDragEventListeners } from './drag';
import { addPositionEventListeners, updateWindowPosition } from './position';
import { setWindowSizeAttributes } from './size';
import { addStackingEventListeners, setActive } from './stacking';

const createWindowManagerElement = () => {
  const div = document.createElement('div');
  div.classList.add('window-manager');
  return div;
};

const WindowManager = (shell: Shell): WindowManagerType => {
  const element = createWindowManagerElement();
  shell.element.append(element);

  addDragEventListeners(element, updateWindowPosition);
  addPositionEventListeners(element);
  addStackingEventListeners(element);

  const showWindow = windowElement => {
    element.append(windowElement);
    setWindowSizeAttributes(windowElement);
    /* element.querySelectorAll('.window--resizable').forEach(window => {
      console.log("make resizable")
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
    }); */
    // shell.formEnhancer.enhanceForms(windowElement); TODO FIXME
    setActive(windowElement);
  };

  return {
    createWindow,
    element,
    setActive,
    shell,
    showWindow,
  };
};

export default WindowManager;
