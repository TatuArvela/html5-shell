import moment from 'moment';

const handleTimeButtonClick = eventTarget => {
  const [method, target] = eventTarget.split('-');
  document.getElementById(target).focus();
  const activeInput = document.activeElement;
  if (activeInput.getAttribute('id') != target) {
    document.activeElement = document.getElementById(target);
  }
  const keyCode = method == 'dec' ? 40 : 38;
  const keypress = new Event('keypress');
  keypress.which = keyCode;
  keypress.keyCode = keyCode;
  activeInput.dispatchEvent(keypress);
};

const handleTimeBlur = e => {
  let values = e.target.value.split(':');

  if (values.length === 2) {
    values[0] = values[0].trim().substring(0, 2);
    values[1] = values[1].trim().substring(0, 2);
    if (!parseInt(values[0]) || values[0] > 23 || values[0] < 0)
      values[0] = '00';
    if (!parseInt(values[1]) || values[1] > 59 || values[1] < 0)
      values[1] = '00';
  } else if (values.length === 1) {
    values[1] = '00';
  } else {
    values = ['00', '00'];
  }

  e.target.value = moment(`${values[0]}:${values[1]}`, 'HH:mm').format('HH:mm');
};

const handleTimeKeypress = e => {
  if (e.keyCode == 38 || e.keyCode == 40) {
    const start = document.activeElement.selectionStart;
    const end = document.activeElement.selectionEnd;

    const time = moment(e.target.value, 'HH:mm');

    const unit = end < 3 ? 'hours' : 'minutes';
    e.keyCode == 38 ? time.add(1, unit) : time.subtract(1, unit);
    e.target.value = time.format('HH:mm');

    document.activeElement.setSelectionRange(start, end);
    e.preventDefault();
  }
};

const enhanceTimeInput = input => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('form__time-input-group');
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const decrease = document.createElement('button');
  decrease.setAttribute('class', 'form__button form__time-input--decrease');
  decrease.setAttribute('id', `dec-${input.getAttribute('id')}`);
  decrease.setAttribute('tabIndex', '-1');
  decrease.addEventListener('mousedown', e => {
    e.preventDefault();
    handleTimeButtonClick(e.target.getAttribute('id'));
  });
  decrease.addEventListener('click', e => {
    e.preventDefault();
    input.focus();
  });
  input.after(decrease);

  const increase = document.createElement('button');
  increase.setAttribute('class', 'form__button form__time-input--increase');
  increase.setAttribute('id', `inc-${input.getAttribute('id')}`);
  increase.setAttribute('tabIndex', '-1');
  increase.addEventListener('mousedown', e => {
    e.preventDefault();
    handleTimeButtonClick(e.target.getAttribute('id'));
  });
  increase.addEventListener('click', e => {
    e.preventDefault();
    input.focus();
  });
  input.after(increase);

  input.onblur = e => handleTimeBlur(e);
  input.onkeydown = e => handleTimeKeypress(e);
  input.onkeypress = e => handleTimeKeypress(e);
  input.setAttribute('data-enhanced', 'true');
};

const enhanceTimeInputs = target => {
  const timeInputs = target.querySelectorAll(
    'input[data-type="time"]:not([data-enhanced="true"])'
  );
  for (let i = 0; i < timeInputs.length; i++) {
    enhanceTimeInput(timeInputs[i]);
  }
};

export { enhanceTimeInputs };
