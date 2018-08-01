/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/es6-npm-toolkit
 * License: MIT, see file 'LICENSE'
 */

const path = require('path')
const fs = require('fs')

module.exports = class WebModuleLinker {

    constructor(projectRoot, projectLibFolder = "lib") {
        this.nodeModulesPath = path.resolve(__dirname, '../../')
        this.projectRoot = projectRoot
        this.projectLibFolder = projectLibFolder
        if (!fs.existsSync(projectLibFolder)) {
            console.log("mkdir", projectLibFolder)
            fs.mkdirSync(projectLibFolder)
        }
    }

    symlinkModuleSrc(moduleName, moduleSrc = moduleName, moduleSrcRoot = "src") {
        let type = "dir"
        if (moduleSrc.endsWith(".js")) {
            type = "file"
        }
        try {
            const fromAbsolute = this.nodeModulesPath + "/" + moduleName + "/" + moduleSrcRoot + "/" + moduleSrc
            if (!fs.existsSync(fromAbsolute)) {
                throw new Error("Error, not found: " + fromAbsolute)
            }
            const fromRelative = "./" + path.relative(this.projectRoot + "/" + this.projectLibFolder, fromAbsolute)
            const to = "./" + this.projectLibFolder + "/" + moduleSrc
            console.log("Linking", fromRelative, "=>", to, "(" + type + ")")
            fs.unlink(to, () => {
                fs.symlinkSync(fromRelative, to, type)
            })
        } catch (e) {
            console.error(e.message)
        }
    }

}