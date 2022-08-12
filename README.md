# ModLib

Use es6 modules from npm in webapps without transpiling.

ModLib is a tool class, to create a library out of the ES6 modules of `node_modules`
to use them in web apps.

## The problem with ES6 and npm in web projects

Let's assume we have two ES6 projects. "cm-main" and "cm-dependency" with the following structure:
`cm-main/src/Main.js` and `cm-dependency/src/Dependency.js`.

When developing "cm-main" the import path from `src/Main.js` to `node_modules/cm-dependency/src/Dependency.js` would be `../node_modules/cm-dependency/src/Dependency.js` but later when both are npm packages, they are both in node_modules and then the import path will become `../../cm-dependency/Dependency.js`. Because of that importing files from node_modules does not work for ES6 web-projects.

## The solution (without transpiling)

When we copy `node_modules/cm-dependency/src/Dependency.js` to `lib/Dependency.js` on `npm install`, the include path for local development from `src/Main.js` will be `../lib/Dependency.js`. Later, when both are npm packages, the import path from `lib/Main.js` will remain `../lib/Dependency.js`. 👍

## Usage

ModLib is mainly used in `postinstall.js`.

```js
// Create an instance of `ModLib` in your `postinstall.js`:

const ModLib = require("modlib")
const modLib = new ModLib()

// Then add modules from packages

modLib.add("npm-package-name-1")
modLib.add("npm-package-name-2")
// [..]
```

The module sources will be copied from the `node_modules/package/src/*` to the `lib/package/*` folder for easy handling of the relative import path from ES6 modules.

## Examples

It works in these plain ES6 module based apps, which must not be transpiled or compiled to run.

- [cm-chess](https://github.com/shaack/cm-chess)
- [cm-fen-editor](https://github.com/shaack/cm-fen-editor)
- [chess-console](https://github.com/shaack/chess-console)
- [chess-console-stockfish](https://github.com/shaack/chess-console-stockfish)

## API

### constructorwww

```js
/**
 * Create the Modrator
 * @param projectRoot Your project root, mostly `__dirname`
 * @param props Configuration properties
 */
constructor(projectRoot = __dirname, props = {})
```

Default props

```js
props = {
    nodeModulesPath: path.resolve(__dirname, '../../'), // path to `node_modules`
    libraryFolder: "lib", // library folder where the module sources are linked/copied to
    mode: "copy" // set to "symlink" to symlink sources instead of copying
}
```

### addToLibrary

```js
/**
 * Add the modules of a node package to the library
 * @param packageName Name of the nmp package
 * @param projectSourceRoot The source root inside the package folder
 * @param fileOrFolder The module source folder or file inside the 'projectSourceRoot'
 */
addToLibrary(packageName, projectSourceRoot = "src", fileOrFolder = packageName)
```
