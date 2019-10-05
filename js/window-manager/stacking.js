const inactivateWindows = (windowManagerElement) => {
  windowManagerElement.querySelectorAll('.window.active').forEach((windowElement) => {
    windowElement.classList.remove("active");
  });
}

const setActive = (windowElement) => {
  inactivateWindows(windowElement.closest(".window-manager"));
  windowElement.parentElement.appendChild(windowElement);
  windowElement.classList.add("active");
}

const addStackingEventListeners = (windowManagerElement) => {
  windowManagerElement.addEventListener("mousedown", (e) => {
    if (
      (e.target !== e.currentTarget) &&
      (e.target.tagName !== 'INPUT') &&
      (e.target.tagName !== 'SELECT') &&
      (e.target.tagName !== 'BUTTON')
    ) {
      setActive(e.target.closest(".window"));
    }

    e.stopPropagation();
  });

  windowManagerElement.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) {
      setActive(e.target.closest(".window"));
    }

    e.stopPropagation();
  });
}

export {
  addStackingEventListeners,
  setActive
}