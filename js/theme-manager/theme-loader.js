import config from './config';

const loadThemes = () => {
  let themes = [];
  config.themes.forEach(theme => themes.push({
    file: composeThemePath(theme.file),
    title: theme.title
  }))

  return themes;
}

const composeThemePath = (theme) => {
  return `${config.basePath}${theme}`;
}

export {
  loadThemes
};