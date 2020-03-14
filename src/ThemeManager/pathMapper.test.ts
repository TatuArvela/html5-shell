import { Theme } from '../types';
import loadThemes from './pathMapper';

const mockConfig = {
  themeManager: {
    basePath: 'node_modules/html5-shell/themes/',
    themes: [
      {
        path: 'win-classic/win9x-16clr.css',
        title: 'Windows 9x, 16 colors',
        otherField: 'Carrot',
      },
      {
        path: 'win-classic/win9x-256clr.css',
        title: 'Windows 9x, 256 colors',
      },
    ],
  },
};

test('Themes should be loaded correctly', () => {
  const expected: Theme[] = [
    {
      path: 'node_modules/html5-shell/themes/win-classic/win9x-16clr.css',
      title: 'Windows 9x, 16 colors',
    },
    {
      path: 'node_modules/html5-shell/themes/win-classic/win9x-256clr.css',
      title: 'Windows 9x, 256 colors',
    },
  ];
  expect(loadThemes(mockConfig)).toEqual(expected);
});
