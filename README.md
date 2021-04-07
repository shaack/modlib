# Modrator

Use es6 modules from npm in webapps without transpiling.

Modrator is tool class, to create a library out of the ES6 modules of `node_modules`
to use them in web apps.

## The problem

**ES6 modules includes are always relative** if the modules are not transpiled. So if you have a portion of the modules
in
`/node_modules` via npm and implement another portion under `/src`, the modules cannot link relatively.

## The solution

**Modrator** solves the problem by copying the sources from `node_modules` to a `web_modules` folder, so that an include
on external dependencies is always found under "../../web_modules", regardless of whether the code is in `/src`
or `/web_modules`.

## Usage

Modrator is mainly used in `postinstall.js`.

```js
// Create an instance of the `WebModuleCurator` in your `postinstall.js`:

const Modrator = require("modrator")
const modrator = new Modrator()

// Then add modules from projects:

modrator.addProject("npm-project-name-1")
modrator.addProject("npm-project-name-2")
// [..]
```

The module sources will be copied from the `node_modules` to a `web_modules` folder for easy handling of the relative
include path from es6 modules.

## Examples

It works in these plain es6 module based apps, which must not be transpiled or compiled to run:

- [cm-chessboard](https://shaack.com/projekte/cm-chessboard/)
- [cm-web-modules](https://shaack.com/projekte/cm-web-modules/)
- [chess-console](https://shaack.com/projekte/chess-console/examples/game-with-random.html)

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
    webModulesFolder: "lib", // library folder where the module sources are linked/copied to
    mode: "copy" // set to "symlink" to symlink sources instead of copying
}
```

### addModules

```js
/**
 * Add the modules of a node package to the library
 * @param packageName Name of the project
 * @param projectSourceRoot The source root inside the module folder
 * @param fileOrFolder The module source folder or file inside the 'projectSourceRoot'
 */
addModules(packageName, projectSourceRoot = "src", fileOrFolder = packageName)
```
