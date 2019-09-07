# html5-win-classic-shell

*html5-win-classic-shell* is a HTML5 replica of the Windows Classic Shell look and feel.

* **Why does this exist?** Retro and nostalgia are in right now. This framework, so to speak, allows you to put windows onto your web site or web app. The basic functionalities like stacking, moving and resizing windows is available out of the box.
* **How do I use it?** Currently *html5-win-classic-shell* is source only. The Sass theme files have to be compiled to CSS, and the script file requires *Moment.js*. The easiest way is to use *Parcel* or a similar bundler. Detailed instructions are available in section [Installation and usage](#installation-and-usage).
* **Where is it used?** I have made a couple of fun projects that use this, [Time 2000](https://github.com/TatuArvela/Time-2000) and [Web Voyager](https://github.com/TatuArvela/Web-Voyager).

## Installation and usage

**html5-win-classic-shell** will initialize the shell and windows detected by it automatically after importing it.

### Parcel

1. Add *html5-win-classic-shell* as a Node.js Git dependency to package.json:

    ```json
    "html5-win-classic-shell": "TatuArvela/html5-win-classic-shell"
    ```

2. Add themes to Parcel's sources:

    ```json
    "scripts": {
      "build": "parcel build index.html node_modules/html5-win-classic-shell/themes/*",
      "dev": "parcel index.html node_modules/html5-win-classic-shell/themes/*"
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

4. Import *html-win-classic-shell* in your app script, and initialize it with the target element, in this case the element found with `#example-shell`:

    ```js
    import Shell from "html5-win-classic-shell";
    const shell = new Shell(document.querySelector('#example-shell'));
    ```

## Themes

*html5-win-classic-shell* includes the most common color depths and themes included in classic Windows versions.

* win9x-16clr: **Windows 9x, 16 colors**
* win9x-256clr: **Windows 9x, 256 colors**
* win9x-16bit: **Windows 9x, 16-bit color**
* win9x-32bit: **Windows 9x, 32-bit color**
* win2k: **Windows 2000**
* vaporwave: **ウィンドウズ**

## Classes
