/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/web-module-curator
 * License: MIT, see file 'LICENSE'
 */

const path = require('path')
const fs = require('fs')

module.exports = class WebModuleCurator {

    constructor(projectRoot, props) {
        this.projectRoot = projectRoot
        this.props = {
            nodeModulesPath: path.resolve(__dirname, '../../'), // path to `node_modules`
            projectLibFolder: "lib", // library folder where the module sources are linked/copied to
            mode: "symlink" // set to "copy" to copy sources instead of symlinking
        }
        Object.assign(this.props, props)
        if (!fs.existsSync(this.props.projectLibFolder)) {
            console.log("mkdir", this.props.projectLibFolder)
            fs.mkdirSync(this.props.projectLibFolder)
        }
    }

    /**
     * Add a module to the library
     * @param moduleName Name of the module
     * @param moduleSourceRoot  The source root inside the module folder
     * @param moduleSource The module source folder or file inside the 'moduleSourceRoot'
     */
    addModule(moduleName, moduleSourceRoot = "src", moduleSource = moduleName) {
        let type = "dir"
        if (moduleSource.endsWith(".js")) {
            type = "file"
        }
        try {
            const fromAbsolute = this.props.nodeModulesPath + "/" + moduleName + "/" + moduleSourceRoot + "/" + moduleSource
            if (!fs.existsSync(fromAbsolute)) {
                console.error("Not found: " + fromAbsolute)
            }
            const fromRelative = path.relative(this.projectRoot + "/" + this.props.projectLibFolder, fromAbsolute)
            const to = "./" + this.props.projectLibFolder + "/" + moduleSource
            console.log("Linking", fromRelative, "=>", to, "(" + type + ")")
            fs.unlink(to, () => {
                if (this.props.mode === "copy") {
                    this.copySync(fromAbsolute, to)
                } else {
                    fs.symlinkSync(fromRelative, to, type)
                }
            })
        } catch (e) {
            console.error(e.message)
        }
    }

    /**
     * Recursive copy of a folder or file
     * @param source
     * @param destination
     */
    copySync(source, destination) {
        const exists = fs.existsSync(source)
        const stats = exists && fs.statSync(source)
        const isDirectory = exists && stats.isDirectory()
        if (isDirectory) {
            fs.mkdirSync(destination)
            fs.readdirSync(source).forEach((childItemName) => {
                this.copySync(path.join(source, childItemName), path.join(destination, childItemName))
            })
        } else {
            fs.copyFileSync(source, destination)
        }
    }

}