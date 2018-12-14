# web-module-curator

Use es6 modules from npm in webapps without transpiling.

A tool class, to create a library out of the sources of `node_modules` 
to use them in web apps as native es6 modules.

Mainly used in `postinstall.js`. 

It works in these plain es6 module based apps, which are not transpiled or compiled:

- [cms-chessboard](https://shaack.com/projekte/cm-chessboard/)
- [chess-console](https://shaack.com/projekte/chess-console/examples/game-with-random.html)

## Usage

```js
// Create an instance of the `WebModuleCurator` in your `postinstall.js`:

const WebModuleCurator = require("web-module-curator")
const curator = new WebModuleCurator(__dirname) // parameter projectRoot

// Then add Modules:

curator.addModule("npm-module-name-1");
curator.addModule("npm-module-name-2");
// [..]
```
