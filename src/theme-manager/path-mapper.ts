import { Config, Theme } from '../types';

const composeThemePath = (config: Config, themeFile: string): string => {
  return `${config.themeManager.basePath}${themeFile}`;
};

const loadThemes = (config: Config) => {
  return config.themeManager.themes.map(
    (theme: Theme): Theme => {
      return {
        path: composeThemePath(config, theme.path),
        title: theme.title,
      };
    }
  );
};

export default loadThemes;
