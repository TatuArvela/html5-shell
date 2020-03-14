import ThemeLink from './ThemeLink';

const mockOnLoad = jest.fn(() => {
  return true;
});

test('Theme link should be constructed correctly', () => {
  expect(ThemeLink(document, 'test', mockOnLoad)).toMatchInlineSnapshot(`
<link
  href="test"
  id="shellTheme"
  media="screen,print"
  rel="stylesheet"
  type="text/css"
/>
`);
});
