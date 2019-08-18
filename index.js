/* Initialization
   ========================================================================== */

const moment = require("moment");
let $shell = {
  eventOperationMemory: {},
};
$shell.elementSelector = ".shell";
$shell.element = document.querySelector($shell.elementSelector);

setTimeout(() => {
  $shell.element.classList.add("ready");
}, 2000);

/* Window management
   ========================================================================== */

$shell.windowManager = {
  titleDrag(e) {
    e = e || window.event;
    e.preventDefault();

    const mem = $shell.eventOperationMemory;
    mem.element = e.target.parentElement;
    $shell.windowManager.setActive(mem.element);

    mem.prevClientX = e.clientX;
    mem.prevClientY = e.clientY;
    document.onmouseup = $shell.windowManager.endDrag;
    document.onmousemove = $shell.windowManager.drag;
  },
  drag(e) {
    e = e || window.event;
    e.preventDefault();

    const mem = $shell.eventOperationMemory;
    const windowMargin = 1;

    if (event.button === 0) {
      mem.xOffset = mem.prevClientX - e.clientX;
      mem.yOffset = mem.prevClientY - e.clientY;
      mem.prevClientX = e.clientX;
      mem.prevClientY = e.clientY;

      let xPos = mem.element.offsetLeft - mem.xOffset - windowMargin;
      if (xPos < 0) xPos = 0;
      if (xPos > $shell.element.offsetWidth - 5) xPos = $shell.element.offsetWidth - 5;

      let yPos = mem.element.offsetTop - mem.yOffset - windowMargin;
      if (yPos < 0) yPos = 0;
      if (yPos > $shell.element.offsetHeight - 5) yPos = $shell.element.offsetHeight - 5;

      mem.element.style.left = xPos + "px";
      mem.element.style.top = yPos + "px";
    }
  },
  endDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  },
  spawnWindow(window) {
    this.addWindowEventListeners(window);
    this.addWindowTitleEventListeners(window.querySelector('.window__title'));
    /* $shell.element.querySelectorAll('.window--resizable').forEach(window => {
      console.log("make resizable")
        window.resizable({
          start: makeActive,
          containment: 'body'
        });
    }); */
    $shell.formEnhancer.enhanceForms(window);
    $shell.element.querySelector(".window-manager").append(window);
  },
  setActive(window) {
    $shell.windowManager.inactivateWindows();
    window.parentElement.appendChild(window);
    window.classList.add("active");
  },
  inactivateWindows() {
    $shell.element.querySelectorAll('.window.active').forEach((window) => {
      window.classList.remove("active");
    });
  },
  addWindowEventListeners(window) {
    window.addEventListener("click", (e) => {
      if (e.target.nodeName === "DIV")
        this.setActive(window)
    });
  },
  addWindowTitleEventListeners(windowTitle) {
    windowTitle.setAttribute("draggable", "");
    windowTitle.addEventListener("mousedown", this.titleDrag);
  },
  addWindowSizes(window) {
    const positionInfo = window.getBoundingClientRect();
    window.style.width = `${positionInfo.width}px`;
    window.style.height = `${positionInfo.height}px`;
  },
  initialize() {
    $shell.element.querySelectorAll('.window').forEach(window =>
      this.spawnWindow(window)
    );
    $shell.element.querySelectorAll('.window__title').forEach(windowTitle =>
      this.addWindowTitleEventListeners(windowTitle)
    );
    setTimeout(() => {
      $shell.element.querySelectorAll('.window').forEach(window =>
        this.addWindowSizes(window)
      )
    }, 100);
  }
}

$shell.themeManager = {
  themes: [{
    file: "shell/themes/win9x-16clr.css",
    title: "Windows 9x, 16 colors"
  },
  {
    file: "shell/themes/win9x-256clr.css",
    title: "Windows 9x, 256 colors"
  },
  {
    file: "shell/themes/win9x-16bit.css",
    title: "Windows 9x, High Color 16-bit"
  },
  {
    file: "shell/themes/win9x-32bit.css",
    title: "Windows 9x, True Color 32-bit"
  },
  {
    file: "shell/themes/win2k.css",
    title: "Windows 2000"
  },
  {
    file: "shell/themes/vaporwave.css",
    title: "ウィンドウズ"
  }],
  setTheme(theme) {
    document.getElementById('shellTheme').setAttribute('href', theme);
  },
  createThemeSwitcher() {
    let themeSwitcher = document.createElement("div");
    themeSwitcher.classList.add("window")

    let windowTitle = document.createElement("div");
    windowTitle.classList.add("window__title")
    windowTitle.innerHTML = "Theme Switcher";

    let windowContent = document.createElement("div");
    windowContent.classList.add("window__content");

    let themeSelect = document.createElement("select");
    themeSelect.classList.add("form__select");
    this.themes.forEach(theme => {
      let themeOption = document.createElement("option");
      themeOption.value = theme.file;
      themeOption.innerHTML = theme.title;
      themeSelect.append(themeOption);
    });
    themeSelect.addEventListener("change", () => {
      if (event.target.value) {
        this.setTheme(event.target.value);
      }
      $shell.windowManager.setActive(themeSwitcher);
    })
    windowContent.append(themeSelect);

    themeSwitcher.append(windowTitle);
    themeSwitcher.append(windowContent);

    $shell.windowManager.spawnWindow(themeSwitcher);
  },
  initialize() {
    this.createThemeSwitcher();
    var defaultTheme = this.themes[0];
    var link = document.createElement("link");
    link.id = "shellTheme";
    link.href = defaultTheme.file;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    document.getElementsByTagName("head")[0].appendChild(link);
  }
}

/* Form enhancements
   ========================================================================== */

$shell.formEnhancer = {
  handleTimeButtonClick(eventTarget) {
    let [method, target] = eventTarget.split("-");
    document.getElementById(target).focus();
    let activeInput = document.activeElement;
    if (activeInput.getAttribute('id') != target) {
      document.activeElement = document.getElementById(target);
    }
    let keyCode = (method == "dec") ? 40 : 38;
    let keypress = new Event("keypress");
    keypress.which = keyCode;
    keypress.keyCode = keyCode;
    activeInput.dispatchEvent(keypress);
  },
  handleTimeBlur(e) {
    let values = e.target.value.split(':');

    if (values.length === 2) {
      values[0] = values[0].trim().substring(0, 2);
      values[1] = values[1].trim().substring(0, 2);
      if (!parseInt(values[0]) || values[0] > 23 || values[0] < 0) values[0] = "00";
      if (!parseInt(values[1]) || values[1] > 59 || values[1] < 0) values[1] = "00";
    }
    else if (values.length === 1) {
      values[1] = "00";
    }
    else {
      values = ["00", "00"]
    }

    e.target.value = moment(values[0] + ':' + values[1], 'HH:mm').format('HH:mm');
  },
  handleTimeKeypress(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      let start = document.activeElement.selectionStart;
      let end = document.activeElement.selectionEnd;

      let time = moment(e.target.value, 'HH:mm');

      let unit = (end < 3) ? 'hours' : 'minutes';
      (e.keyCode == 38) ? time.add(1, unit) : time.subtract(1, unit);
      e.target.value = time.format('HH:mm');

      document.activeElement.setSelectionRange(start, end);
      e.preventDefault();
    }
  },
  enhanceTimeInput(input) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form__time-input-group');
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const decrease = document.createElement('button');
    decrease.setAttribute('class', 'form__button form__time-input--decrease');
    decrease.setAttribute('id', 'dec-' + input.getAttribute('id'));
    decrease.setAttribute('tabIndex', '-1');
    decrease.addEventListener('mousedown', function (event) {
      event.preventDefault();
      event.target.classList.add('active');
      $shell.formEnhancer.handleTimeButtonClick(event.target.getAttribute('id'));
    });
    decrease.addEventListener('mouseup', function (event) {
      event.target.classList.remove('active');
    });
    input.after(decrease);

    const increase = document.createElement('button');
    increase.setAttribute('class', 'form__button form__time-input--increase');
    increase.setAttribute('id', 'inc-' + input.getAttribute('id'));
    increase.setAttribute('tabIndex', '-1');
    increase.addEventListener('mousedown', function (event) {
      event.preventDefault();
      event.target.classList.add('active');
      $shell.formEnhancer.handleTimeButtonClick(event.target.getAttribute('id'));
    });
    increase.addEventListener('mouseup', function (event) {
      event.target.classList.remove('active');
    });
    input.after(increase);

    input.onblur = this.handleTimeBlur;
    input.onkeydown = this.handleTimeKeypress;
    input.onkeypress = this.handleTimeKeypress;
  },
  enhanceSelect(select) {
    // TODO
    // https://www.w3schools.com/howto/howto_custom_select.asp
  },
  enhanceForms(target) {
    var timeInputs = target.querySelectorAll('input[data-type="time"]');
    for (let i = 0; i < timeInputs.length; i++) {
      this.enhanceTimeInput(timeInputs[i]);
    }
  }
}

$shell.windowManager.initialize();
$shell.themeManager.initialize();