import moment from "moment";

export default class Forms {
  constructor(shell) {
    this.Shell = shell;
  }

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
  }

  handleTimeBlur(e) {
    let values = e.target.value.split(':');

    if (values.length === 2) {
      values[0] = values[0].trim().substring(0, 2);
      values[1] = values[1].trim().substring(0, 2);
      if (!parseInt(values[0]) || values[0] > 23 || values[0] < 0) values[0] = "00";
      if (!parseInt(values[1]) || values[1] > 59 || values[1] < 0) values[1] = "00";
    } else if (values.length === 1) {
      values[1] = "00";
    } else {
      values = ["00", "00"]
    }

    e.target.value = moment(values[0] + ':' + values[1], 'HH:mm').format('HH:mm');
  }

  handleTimeKeypress(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
      let start = document.activeElement.selectionStart;
      let end = document.activeElement.selectionEnd;

      let time = moment(e.target.value, 'HH:mm');

      let unit = (end < 3) ? 'hours' : 'minutes';
      (e.keyCode == 38) ? time.add(1, unit): time.subtract(1, unit);
      e.target.value = time.format('HH:mm');

      document.activeElement.setSelectionRange(start, end);
      e.preventDefault();
    }
  }

  enhanceTimeInput(input) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form__time-input-group');
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const decrease = document.createElement('button');
    decrease.setAttribute('class', 'form__button form__time-input--decrease');
    decrease.setAttribute('id', 'dec-' + input.getAttribute('id'));
    decrease.setAttribute('tabIndex', '-1');
    decrease.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.handleTimeButtonClick(e.target.getAttribute('id'));
    });
    input.after(decrease);

    const increase = document.createElement('button');
    increase.setAttribute('class', 'form__button form__time-input--increase');
    increase.setAttribute('id', 'inc-' + input.getAttribute('id'));
    increase.setAttribute('tabIndex', '-1');
    increase.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.handleTimeButtonClick(e.target.getAttribute('id'));
    });
    input.after(increase);

    input.onblur = (e) => this.handleTimeBlur(e);
    input.onkeydown = (e) => this.handleTimeKeypress(e);
    input.onkeypress = (e) => this.handleTimeKeypress(e);
    input.setAttribute('data-enhanced', 'true');
  }

  enhanceSelect(select) {
    // TODO
    // https://www.w3schools.com/howto/howto_custom_select.asp
  }

  enhanceForms(target) {
    const timeInputs = target.querySelectorAll('input[data-type="time"]:not([data-enhanced="true"])');
    for (let i = 0; i < timeInputs.length; i++) {
      this.enhanceTimeInput(timeInputs[i]);
    }
  }
}