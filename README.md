# ModLib

Use es6 modules from npm in webapps without transpiling.

ModLib is a tool class, to create a library out of the ES6 modules of `node_modules`
to use them in web apps.

## The problem

**ES6 modules includes are always relative** if the modules are not transpiled. So if you have a portion of the modules
in
`/node_modules` via npm and implement another portion under `/src`, the modules cannot link relatively.

## The solution

**ModLib** solves the problem by copying the sources from `/node_modules` to a `/lib` folder, so that an include
on external dependencies is always found in a relative path as `../../lib/module-name/File.js`, regardless of
whether the code is in `/src` or `/lib`.

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

The module sources will be copied from the `node_modules/package/src/*` to the `lib/package/*` folder for easy handling of the relative
include path from es6 modules.

## Examples

It works in these plain es6 module based apps, which must not be transpiled or compiled to run:

- [cm-chessboard](https://shaack.com/projekte/cm-chessboard/)
- [chess-console](https://shaack.com/projekte/chess-console/examples/game-with-random.html)
- [cm-web-modules](https://github.com/shaack/cm-web-modules)

## API

### constructor

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
