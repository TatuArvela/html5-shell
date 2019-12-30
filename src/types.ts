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
  shell: Shell;
  themes: Theme[];
  themeLink: HTMLElement;
  initialize: Function;
};

export type ThemeManager = object;

export type Shell = {
  element?: HTMLElement;
  config: Config;
  windowManager?: WindowManager;
  themeManager?: ThemeManager;
};
