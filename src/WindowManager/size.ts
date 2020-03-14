const setWindowSizeAttributes = (window: HTMLElement) => {
  const positionInfo = window.getBoundingClientRect();
  // eslint-disable-next-line no-param-reassign
  window.style.width = `${positionInfo.width}px`;
  // eslint-disable-next-line no-param-reassign
  window.style.height = `${positionInfo.height}px`;
};

// TODO: Resize functions

// TODO: Maximize/Restore functions

// eslint-disable-next-line import/prefer-default-export
export { setWindowSizeAttributes };
