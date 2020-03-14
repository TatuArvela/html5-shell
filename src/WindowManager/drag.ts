type Operation = {
  xOffset?: number;
  yOffset?: number;
  prevClientX?: number;
  prevClientY?: number;
  windowElement: HTMLElement;
  updateWindowPosition: (target, windowElement, x, y) => void;
};

const drag = (e, op: Operation) => {
  const event = e || window.event;
  e.preventDefault();

  if (event.button === 0) {
    // eslint-disable-next-line no-param-reassign
    op.xOffset = op.prevClientX - e.clientX;
    // eslint-disable-next-line no-param-reassign
    op.yOffset = op.prevClientY - e.clientY;
    // eslint-disable-next-line no-param-reassign
    op.prevClientX = e.clientX;
    // eslint-disable-next-line no-param-reassign
    op.prevClientY = e.clientY;

    const x = op.windowElement.offsetLeft - op.xOffset;
    const y = op.windowElement.offsetTop - op.yOffset;

    op.updateWindowPosition(e.target, op.windowElement, x, y);
  }
};

const endDrag = (event, op) => {
  document.removeEventListener('mouseup', op.endDrag);
  document.removeEventListener('mousemove', op.drag);
};

const titleDrag = (e, updateWindowPosition) => {
  const event = e || window.event;
  e.preventDefault();

  const op = {
    windowElement: null,
    updateWindowPosition: null,
    endDrag: null,
    drag: null,
  };

  op.windowElement = event.target.closest('.window');
  op.updateWindowPosition = updateWindowPosition;
  op.endDrag = e1 => endDrag(e1, op);
  op.drag = e2 => drag(e2, op);

  document.addEventListener('mouseup', op.endDrag);
  document.addEventListener('mousemove', op.drag);
};

const addDragEventListeners = (target, updateWindowPosition) => {
  target.addEventListener('mousedown', e => {
    const windowTitle = e.target.closest('.window__title');
    if (windowTitle !== null) {
      windowTitle.setAttribute('draggable', '');

      titleDrag(e, (windowElement, _windowX, _windowY) =>
        updateWindowPosition(target, windowElement, _windowX, _windowY)
      );
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { addDragEventListeners };
