import {
  enhanceTimeInputs
} from './time-input-enhancer';

export default class Forms {
  constructor(shell) {
    this.shell = shell;
  }

  enhanceSelect(select) {
    // TODO
    // https://www.w3schools.com/howto/howto_custom_select.asp
  }

  enhanceForms(target) {
    enhanceTimeInputs(target);
  }
}