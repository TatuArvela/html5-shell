export type Theme = {
  path: string;
  title: string;
};

export type Config = {
  themeManager: {
    basePath: string;
    themes: Theme[];
  };
};

export type WindowManager = {
  createWindow: (title: string, contentElements: HTMLElement[]) => HTMLElement;
  element: HTMLElement;
  setActive: (windowElement: HTMLElement) => void;
  shell: Shell;
  showWindow: (window: HTMLElement) => void;
};

export type ThemeManager = {
  shell: Shell;
  themeLink: HTMLElement;
  themes: Theme[];
  themeSwitcher: HTMLElement;
};

export type Shell = {
  element?: HTMLElement;
  config: Config;
  windowManager?: WindowManager;
  themeManager?: ThemeManager;
};
