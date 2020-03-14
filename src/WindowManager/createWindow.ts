const createWindowElement = () => {
  const div = document.createElement('div');
  div.classList.add('window');
  return div;
};

const createWindowTitle = (title: string) => {
  const div = document.createElement('div');
  div.classList.add('window__title');
  div.innerHTML = title;
  return div;
};

const createWindowContentWrapper = () => {
  const div = document.createElement('div');
  div.classList.add('window__content');
  return div;
};

const createWindow = (title: string, contentElements: HTMLElement[]) => {
  const window = createWindowElement();
  window.append(createWindowTitle(title));

  const windowContentWrapper = createWindowContentWrapper();
  contentElements.forEach(element => windowContentWrapper.append(element));
  window.append(windowContentWrapper);

  return window;
};
export default createWindow;
