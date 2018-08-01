# web-module-linker

A tool class, to symlink modules out of the `node_modules` to a `lib`
folder to use them in web apps as native es6 modules without transpiling.

Mainly used as `postinstall.js`. 

It works in these plain vanilla es6 module based apps, 
which are not transpiled or compiled:

- [cms-chessboard](https://shaack.com/projekte/cm-chessboard/)
- [chess-console](https://shaack.com/projekte/chess-console/examples/game-with-random.html)

