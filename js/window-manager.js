export default class WindowManager {
  constructor(shell) {
    this.Shell = shell;
  }

  initialize() {
    this.addWindowManagerEventListeners();
    this.initializeAllWindows();
  }

  titleDrag(e) {
    e = e || window.event;
    e.preventDefault();

    let mem = this.Shell.eventOperationMemory;
    mem.element = e.target.closest(".window");
    this.setActive(mem.element);

    mem.prevClientX = e.clientX;
    mem.prevClientY = e.clientY;
    document.onmouseup = (e) => this.endDrag(e);
    document.onmousemove = (e) => this.drag(e);
  }

  drag(e) {
    e = e || window.event;
    e.preventDefault();

    let mem = this.Shell.eventOperationMemory;

    if (event.button === 0) {
      mem.xOffset = mem.prevClientX - e.clientX;
      mem.yOffset = mem.prevClientY - e.clientY;
      mem.prevClientX = e.clientX;
      mem.prevClientY = e.clientY;

      let xPos = mem.element.offsetLeft - mem.xOffset;
      let yPos = mem.element.offsetTop - mem.yOffset;

      this.updateWindowPosition(mem.element, xPos, yPos);
    }
  }

  updateWindowPosition(element, _xPos, _yPos) {
    const windowMargin = 1;

    let xPos = _xPos !== undefined ? _xPos : element.offsetLeft;
    let yPos = _yPos !== undefined ? _yPos : element.offsetTop;

    xPos = xPos - windowMargin;
    yPos = yPos - windowMargin;

    if (xPos < 0) xPos = 0;
    if (xPos > this.Shell.element.offsetWidth - 5) xPos = this.Shell.element.offsetWidth - 5;

    if (yPos < 0) yPos = 0;
    if (yPos > this.Shell.element.offsetHeight - 5) yPos = this.Shell.element.offsetHeight - 5;

    element.style.left = xPos + "px";
    element.style.top = yPos + "px";
  }

  endDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  initializeWindow(window) {
    this.setWindowSizeAttributes(window);
    /* this.Shell.element.querySelectorAll('.window--resizable').forEach(window => {
      console.log("make resizable")
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
    }); */
    this.Shell.FormEnhancer.enhanceForms(window);
  }

  addWindow(window) {
    this.Shell.element.querySelector(".window-manager").append(window);
  }

  initializeAllWindows() {
    this.Shell.element.querySelectorAll('.window').forEach((window) => {
      this.initializeWindow(window);
    });
  }

  inactivateWindows() {
    this.Shell.element.querySelectorAll('.window.active').forEach((window) => {
      window.classList.remove("active");
    });
  }

  setActive(window) {
    this.inactivateWindows();
    window.parentElement.appendChild(window);
    window.classList.add("active");
  }

  setWindowSizeAttributes(window) {
    const positionInfo = window.getBoundingClientRect();
    window.style.width = `${positionInfo.width}px`;
    window.style.height = `${positionInfo.height}px`;
  }

  addWindowManagerEventListeners() {
    const windowManagerElement = this.Shell.element.querySelector('.window-manager');

    windowManagerElement.addEventListener("mousedown", (e) => {
      const windowTitle = e.target.closest(".window__title");
      if (windowTitle !== null) {
        windowTitle.setAttribute("draggable", "");
        this.titleDrag(e);
      }

      if (
        (e.target !== e.currentTarget) &&
        (e.target.tagName !== 'INPUT') &&
        (e.target.tagName !== 'SELECT') &&
        (e.target.tagName !== 'BUTTON')
      ) {
        this.setActive(e.target.closest(".window"));
      }

      e.stopPropagation();
    });

    windowManagerElement.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) {
        this.setActive(e.target.closest(".window"));
      }

      e.stopPropagation();
    });

    window.addEventListener("resize", (e) => {
      const windowManagerElement = this.Shell.element.querySelector('.window-manager');
      const windows = windowManagerElement.querySelectorAll('.window');

      for (let i = 0; i < windows.length; i++) {
        const element = windows[i];
        this.updateWindowPosition(element);
      }
    });
  }
}