const createThemeLink = (
  document: HTMLDocument,
  defaultTheme: string,
  onLoad: EventListener
) => {
  const link = document.createElement('link');
  link.id = 'shellTheme';
  link.href = defaultTheme;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'screen,print';
  link.onload = onLoad;

  // document.getElementsByTagName('head')[0].appendChild(link);
  return link;
};

export default createThemeLink;
