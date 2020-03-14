const ThemeLink = (
  document: HTMLDocument,
  defaultTheme: string,
  onLoad: EventListener
) => {
  const createElement = () => {
    const link = document.createElement('link');
    link.id = 'shellTheme';
    link.href = defaultTheme;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.media = 'screen,print';
    link.onload = onLoad;
    return link;
  };

  return createElement();
};

export default ThemeLink;
