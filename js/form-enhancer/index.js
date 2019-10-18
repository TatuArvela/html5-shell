import {
  enhanceTimeInputs
} from './time-input-enhancer';

const FormEnhancer = (shell) => {
  const enhanceSelect = (select) => {
    // TODO
    // https://www.w3schools.com/howto/howto_custom_select.asp
  };

  const enhanceForms = (target) => {
    enhanceTimeInputs(target);
  }

  return {
    shell,
    enhanceForms,
  };
}

export default FormEnhancer;