# Platform notice
Most of the instructions in this file have only been tested for Windows.

If you use either MacOS or Linux, you might be on your own.

# Contributors using RPG Maker MV

## Requirements
- [node.js](https://nodejs.org/en/download/)

## pre-commit Hook

### Enabling hidden folders
- [Windows](https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5)

### Setting up the hook
In the root of the cloned repository, navigate to `.git/hooks`. If it doesn't already exist, create a file titled `pre-commit` (note that there is no file extension). After creating the file, open it via a text editor and paste in the hook below.

### Using the hook
Before beginning to stage files for a commit, run `git commit` inside the terminal to activate the hook.
This hook calls a file in the `scripts` folder titled `pre-commit.js`. This file:

* Sets `System.json`'s versionId and editMapId to constant values
* Sets all scrollX and scrollY values in `MapInfos.json` to 0
* Sets certain values in `Armors.json` that allow state resistance accessories to work as intended
* Removes unnecessary data from `Enemies.json`
* "Prettifies" all .json files (except for `Animations.json` due to its sheer size)

After the hook runs, stage files and complete your commit.

### Hook configuration
All configurations are edited at the top of the `scripts/pre-commit.js` file.

#### Minify
Determines whether .json files are readable (`false`) or condensed (`true`). Default is `false`.

### The hook
```
#!/usr/bin/env node

var childProcess = require('child_process')

function runScript(scriptPath, callback) {

    var invoked = false

    var process = childProcess.fork(scriptPath)

    process.on('error', function (err) {
        if (invoked) return
        invoked = true
        callback(err)
    })

    process.on('exit', function (code) {
        if (invoked) return
        invoked = true
        var err = code === 0 ? null : new Error('exit code ' + code)
        callback(err)
    })

}

runScript('./scripts/pre-commit.js', function (err) {
    if (err) throw err
    console.log('finished running some-script.js')
})
```

# Contributors NOT using RPG Maker MV

## Compiling the game

### Windows

#### Method #1 (requires node.js)
Download and install [node.js](https://nodejs.org/en/download/).

Afterwards, download [NW.js v0.30.0 for Windows](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-win-x64.zip) and unzip it in the root of the cloned repository. Please ensure that the file structure of `thetrail/nwjs-v0.30-win-x64` looks like this: 

![nw.js file structure](https://user-images.githubusercontent.com/44245434/184078180-8ff4d6e4-1332-4a39-b05e-6b08d768ef0c.png)

Every time you would like to play your modified game, run `PLAYTEST.bat`, located in the repository's root.

#### Method #2 (no extra downloads)
1. Download and extract [NW.js v0.30.0 for Windows](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-win-x64.zip).
2. Move `package.json`, `package-lock.json`, and `node_modules` from the repository to the root of `nwjs-v0.30.0-win-x64`.
3. Open `package.json` with your text editor of choice. Change the value of `"main"` to `"www/index.html"`, and the value of `"icon"` to `"www/icon/icon.png"`. Do NOT delete the commas.
4. Create a folder titled `www` inside `nwjs-v0.30.0-win-x64`.
5. Move every folder and `index.html` from the download of The Trail to `www`.
6. Run `nw.exe` to launch the game. If you receive a [Windows SmartScreen error](https://techcommunity.microsoft.com/t5/image/serverpage/image-id/236239i5BF05C3634826BFC/image-dimensions/484x457?v=v2), dismiss it by clicking "More info" and "Run anyways".
