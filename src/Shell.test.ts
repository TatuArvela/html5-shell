import config from './config';
import Shell from './Shell';

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
});

describe('Shell', () => {
  it('when initialized, body should match snapshot', () => {
    document.body.outerHTML = '<body class="shell" id="shell"></body>';
    Shell(document.body, config);

    expect(document.body).toMatchInlineSnapshot(`
      <body
        class="shell"
        id="shell"
      >
        <div
          class="window-manager"
        />
      </body>
    `);
  });

  it('when initialized, head should match snapshot', () => {
    document.body.outerHTML = '<body class="shell" id="shell"></body>';
    Shell(document.body, config);

    expect(document.head).toMatchInlineSnapshot(`
      <head>
        <link
          href="node_modules/html5-shell/themes/win-classic/win9x-16clr.css"
          id="shellTheme"
          media="screen,print"
          rel="stylesheet"
          type="text/css"
        />
      </head>
    `);
  });
});
