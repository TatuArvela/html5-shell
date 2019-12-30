import { Theme } from '../types';
import createThemeSwitcher from './switcher-element';

const testThemes: Theme[] = [
  {
    path: 'node_modules/html5-shell/themes/win-classic/win9x-16clr.css',
    title: 'Windows 9x, 16 colors',
  },
  {
    path: 'node_modules/html5-shell/themes/win-classic/win9x-256clr.css',
    title: 'Windows 9x, 256 colors',
  },
];
const mockSetTheme = jest.fn(() => {});

test('Theme switcher should be constructed correctly', () => {
  expect(createThemeSwitcher(testThemes, mockSetTheme)).toMatchInlineSnapshot(`
<div
  class="window"
>
  <div
    class="window__title"
  >
    Theme Switcher
  </div>
  <div
    class="window__content"
  >
    <select
      class="form__select"
    >
      <option
        value="node_modules/html5-shell/themes/win-classic/win9x-16clr.css"
      >
        Windows 9x, 16 colors
      </option>
      <option
        value="node_modules/html5-shell/themes/win-classic/win9x-256clr.css"
      >
        Windows 9x, 256 colors
      </option>
    </select>
  </div>
</div>
`);
});
