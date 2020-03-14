const updateWindowPosition = (
  containerElement: HTMLElement,
  windowElement: HTMLElement,
  _windowX?: number,
  _windowY?: number
) => {
  const windowMargin = 1;

  let windowX = _windowX !== undefined ? _windowX : windowElement.offsetLeft;
  let windowY = _windowY !== undefined ? _windowY : windowElement.offsetTop;

  windowX -= windowMargin;
  windowY -= windowMargin;

  if (windowX < 0) windowX = 0;
  if (windowX > containerElement.offsetWidth - 5)
    windowX = containerElement.offsetWidth - 5;

  if (windowY < 0) windowY = 0;
  if (windowY > containerElement.offsetHeight - 5)
    windowY = containerElement.offsetHeight - 5;

  // eslint-disable-next-line no-param-reassign
  windowElement.style.left = `${windowX}px`;
  // eslint-disable-next-line no-param-reassign
  windowElement.style.top = `${windowY}px`;
};

const addPositionEventListeners = (windowManagerElement: HTMLElement) => {
  window.addEventListener('resize', () => {
    const windows = windowManagerElement.querySelectorAll('.window');

    for (let i = 0; i < windows.length; i += 1) {
      const element = windows[i] as HTMLElement;
      updateWindowPosition(windowManagerElement, element);
    }
  });
};

export { updateWindowPosition, addPositionEventListeners };
