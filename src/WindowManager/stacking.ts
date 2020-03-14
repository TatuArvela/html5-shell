const inactivateWindows = (windowManagerElement: HTMLElement) => {
  windowManagerElement
    .querySelectorAll('.window.active')
    .forEach(windowElement => {
      windowElement.classList.remove('active');
    });
};

// TODO: Comment this better
const setActive = (windowElement: HTMLElement) => {
  const windowManagerElement = windowElement.closest(
    '.window-manager'
  ) as HTMLElement;
  // Shuffling windows in DOM makes a different element active
  const { activeElement } = document;

  inactivateWindows(windowManagerElement);

  windowElement.parentElement.appendChild(windowElement);
  windowElement.classList.add('active');

  (activeElement as HTMLElement).focus(); // Restore active element
};

const mousedownListener = e => {
  if (e.target !== e.currentTarget && e.target.tagName !== 'BUTTON') {
    setActive(e.target.closest('.window'));
  }
};

const clickListener = e => {
  if (e.target !== e.currentTarget) {
    setActive(e.target.closest('.window'));
  }
};

const addStackingEventListeners = element => {
  element.addEventListener('mousedown', mousedownListener);
  element.addEventListener('click', clickListener);
};

const removeStackingEventListeners = element => {
  element.removeEventListener('mousedown', mousedownListener);
  element.removeEventListener('click', clickListener);
};

export { addStackingEventListeners, removeStackingEventListeners, setActive };
