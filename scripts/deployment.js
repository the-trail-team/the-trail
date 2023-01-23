#!/usr/bin/env node

const fs = require('fs')

try {
    // Config edits
    const path_config = __dirname + `/config.json`
    let config = JSON.parse(fs.readFileSync(path_config))

    // # Force all files to be mini-fied
    config['pre-commit'].minify = false
    
    // # 
    config.deployment.extraPath = __dirname + "/../"

    fs.writeFileSync(path_config, JSON.stringify(config, null, 0))

    // Fix package.json
    const path_package = __dirname + `/../package.json`
    let package = JSON.parse(fs.readFileSync(path_package))
    package.main = "www/index.html"
    package.window.icon = "www/icon/icon.png"
    fs.writeFileSync(path_package, JSON.stringify(package, null, 0))
} catch (err) {
    console.error(err)
    process.exit(1)
}
