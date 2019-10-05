const setWindowSizeAttributes = (window) => {
  const positionInfo = window.getBoundingClientRect();
  window.style.width = `${positionInfo.width}px`;
  window.style.height = `${positionInfo.height}px`;
}

// TODO: Resize functions

// TODO: Maximize/Restore functions

export {
  setWindowSizeAttributes
}