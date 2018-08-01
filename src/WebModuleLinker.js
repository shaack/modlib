/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/es6-npm-toolkit
 * License: MIT, see file 'LICENSE'
 */

const path = require('path')

/*
const linker = new ModuleLinker(__dirname + "/src")
linker.symLinkModuleSrc("cm-chessboard", "cm-chessboard)
linker.symLinkModuleSrc("bootstrap-show-modal", "bootstrap-show-modal.js")
 */

module.exports = class WebModuleLinker {

    constructor(projectSrcFolder) {
        this.nodeModulesPath = path.resolve(__dirname, '..')
        this.projectSrcFolder = projectSrcFolder
    }

    symlinkModuleSrc(moduleName, moduleSrc, moduleSrcFolder = "src") {
        let type = "dir"
        if (moduleSrc.endsWith(".js")) {
            type = "file"
        }
        try {
            fs.unlink(this.projectSrcFolder + "/" + moduleSrc, () => {
                console.log("Creating link from", moduleName, moduleSrcFolder, moduleSrc, "to", moduleSrc)
                fs.symlinkSync(this.nodeModulesPath + "/", moduleSrcFolder + "/" + moduleSrc, type)
            })
        } catch (e) {
            console.log(e.message)
        }
    }

}