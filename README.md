# html5-shell

| In development, pre-release |
| --- |

**Shell** (**html5-shell**) is a framework that imitates **graphical (GUI) shells**. It can be used to build web apps that imitate desktop applications. Basic functionalities like stacking, moving and resizing windows are available out of the box.

## Installation

Currently, **Shell** is available as ES6 and Sass _source only_. The easiest way is to use **Parcel** or a similar bundler.

### Parcel

1. Add *html5-shell* as a Node.js Git dependency to package.json:

    ```json
    "html5-shell": "TatuArvela/html5-shell"
    ```

2. Add themes to Parcel's sources:

    ```json
    "scripts": {
      "build": "parcel build index.html node_modules/html5-shell/themes/*",
      "dev": "parcel index.html node_modules/html5-shell/themes/*"
    }
    ```

3. Add the following basic structure in your HTML:

    ```html
    <!--parent element-->
        <div class="shell" id="#example-shell">
            <div class="window-manager">
                ...
            </div>
        </div>
    <!--/-->
    ```

    The parent element determines the size of the shell. For a full-screen shell, substitute `<div class="shell">` with `<body class="shell">`.

    More information about classes used by **Shell** is available in [Classes](#classes).

4. Import *html-shell* in your app script, and initialize it with the target element, in this case the element found with `#example-shell`:

    ```js
    import Shell from "html5-shell";
    const shell = new Shell(document.querySelector('#example-shell'));
    ```

    More information about **Shell** internals is available in [Internals](#internals).

## Themes

### win-classic

*win-classic* is the standard theme set for *html5-shell*. *win-classic* includes the most common color depths and themes included in classic Windows versions.

* win9x-16clr: **Windows 9x, 16 colors**
* win9x-256clr: **Windows 9x, 256 colors**
* win9x-16bit: **Windows 9x, 16-bit color**
* win9x-32bit: **Windows 9x, 32-bit color**
* win2k: **Windows 2000**
* win9x-aesthetic: **ウィンドウズ**

## Classes

**TODO**  
**Shell** uses the Block Element Modifier (BEM) methodology for class naming.

## Internals

**Shell** uses ES6 classes for its internal structure.

**Shell** has three submodules: FormEnhancer, ThemeManager and WindowManager.

### FormEnhancer

**FormEnhancer** initializes additional functionality in special form components, such as time inputs.

* **timeInputEnhancer**: Adds stepper buttons and keypress logic to time inputs

### ThemeManager

**ThemeManager** adds a dedicated stylesheet link element to `head` for **Shell**, and initializes theme switching functionality.

* **themeLoader**: Parses theme catalogue from **config**
* **themeSwitcher**: Builds a theme switcher window

### WindowManager

**WindowManager** handles all actions related to windowing.

* **drag**: Adds window dragging operation event handlers
* **position**: Makes sure windows stay inside the view area
* **size**: Handles window sizing and resizing
* **stacking**: Handles activating and stacking windows

## Samples

**html5-shell** is built from Windows Classic imitations used in my sample projects [Time 2000](https://github.com/TatuArvela/Time-2000) and [Web Voyager](https://github.com/TatuArvela/Web-Voyager), and will replace their implementations when sufficiently mature.
