const updateWindowPosition = (containerElement, windowElement, _windowX, _windowY) => {
  const windowMargin = 1;

  let windowX = _windowX !== undefined ? _windowX : windowElement.offsetLeft;
  let windowY = _windowY !== undefined ? _windowY : windowElement.offsetTop;

  windowX = windowX - windowMargin;
  windowY = windowY - windowMargin;

  if (windowX < 0) windowX = 0;
  if (windowX > containerElement.offsetWidth - 5) windowX = containerElement.offsetWidth - 5;

  if (windowY < 0) windowY = 0;
  if (windowY > containerElement.offsetHeight - 5) windowY = containerElement.offsetHeight - 5;

  windowElement.style.left = windowX + "px";
  windowElement.style.top = windowY + "px";
}

const addPositionEventListeners = (windowManagerElement) => {
  window.addEventListener("resize", (e) => {
    const windows = windowManagerElement.querySelectorAll('.window');

    for (let i = 0; i < windows.length; i++) {
      const element = windows[i];
      updateWindowPosition(windowManagerElement, element);
    }
  });
}

export {
  updateWindowPosition,
  addPositionEventListeners
}