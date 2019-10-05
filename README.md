# html5-shell

*html5-shell* is a framework for building user interfaces that imitate desktop applications.

* **Why does this exist?** Retro and nostalgia are in right now. This framework allows you to use imitation desktop windows in your web site or web app. Basic functionalities like stacking, moving and resizing windows are available out of the box.
* **How do I use it?** Currently *html5-shell* is source only. The Sass theme files have to be compiled to CSS, and the script file requires *Moment.js*. The easiest way is to use *Parcel* or a similar bundler. Detailed instructions are available in section [Installation and usage](#installation-and-usage).
* **Where is it used?** I have made a couple of fun projects that use this, [Time 2000](https://github.com/TatuArvela/Time-2000) and [Web Voyager](https://github.com/TatuArvela/Web-Voyager).

## Installation and usage

**html5-shell** will initialize the shell and windows detected by it automatically after importing it.

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

4. Import *html-shell* in your app script, and initialize it with the target element, in this case the element found with `#example-shell`:

    ```js
    import Shell from "html5-shell";
    const shell = new Shell(document.querySelector('#example-shell'));
    ```

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
