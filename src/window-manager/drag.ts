const drag = (e, op) => {
  const event = e || window.event;
  e.preventDefault();

  if (event.button === 0) {
    op.xOffset = op.prevClientX - e.clientX;
    op.yOffset = op.prevClientY - e.clientY;
    op.prevClientX = e.clientX;
    op.prevClientY = e.clientY;

    const x = op.windowElement.offsetLeft - op.xOffset;
    const y = op.windowElement.offsetTop - op.yOffset;

    op.updateWindowPosition(op.windowElement, x, y);
  }
};

const endDrag = (e, op) => {
  document.removeEventListener('mouseup', op.endDrag);
  document.removeEventListener('mousemove', op.drag);
};

const titleDrag = (e, updateWindowPosition) => {
  e = e || window.event;
  e.preventDefault();

  const op = {}; // Operation

  op.windowElement = e.target.closest('.window');
  op.updateWindowPosition = updateWindowPosition;
  op.endDrag = e => endDrag(e, op);
  op.drag = e => drag(e, op);

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

export { addDragEventListeners };
