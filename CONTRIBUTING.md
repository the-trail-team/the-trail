# Requirements for all contributors
All contributors need to install [node.js](https://nodejs.org/en/download/), whether you are or aren't using RMMV. This is required for running certain scripts that are found in both methods.

# Contributors using RPG Maker MV
## pre-commit Hook

### Setting up the hook
In the root of the cloned repository, navigate to `.git/hooks`. If it doesn't already exist, create a file titled `pre-commit` (note that there is no file extension). After creating the file, open it via a text editor and paste in the hook below.

### Using the hook
Before beginning to stage files for a commit, run `git commit` inside the terminal to activate the hook. This hook:

* Sets `System.json`'s versionId and editMapId to constant values
* Sets all scrollX and scrollY values in `MapInfos.json` to 0
* Sets certain values in `Armors.json` that allow state resistance accessories to work as intended
* Removes unnecessary data from `Enemies.json`
* "Prettifies" all .json files (except for `Animation.json` due to its sheer size)

Complete your commit after the hook runs.

### Hook configuration
All configurations are edited at the top of the hook.

#### Minify
Determines whether .json files are readable (`false`) or condensed (`true`).

### The hook
```
#!/usr/bin/env node

// CONFIGURATION
const minify = false;

// DO NOT EDIT BELOW
const data_directory = "data"
const file = ['package.json']
let command = ''
const fs = require('fs')
const indent = minify ? 0 : 2;
try {
    fs.readdir(`${data_directory}`, function (err, files) {
        // Error handling
        if (err || files.length <= 0) {
            console.error(err)
            process.exit(1)
        }

        // System.json: versionId and editMapId constants
        let system = JSON.parse(fs.readFileSync(`${data_directory}/System.json`))
        system.versionId = 0
        system.editMapId = 164
        fs.writeFileSync(`${data_directory}/System.json`, JSON.stringify(system, null, indent))

        // MapInfos.json: all scrollX and scrollY values set to 0
        let maps = JSON.parse(fs.readFileSync(`${data_directory}/MapInfos.json`))
        for (i = 1; i < maps.length; i++) {
            if (maps[i] !== null) {
                maps[i].scrollX = 0
                maps[i].scrollY = 0
            }
        }
        fs.writeFileSync(`${data_directory}/MapInfos.json`, JSON.stringify(maps, null, indent))

        // Armors.json: setting all state resistances to "value": 2 in order to work correctly
        let armors = JSON.parse(fs.readFileSync(`${data_directory}/Armors.json`))
        for (i = 1; i < armors.length; i++) {
            if (armors[i].traits.length > 0) {
                for (j = 0; j < armors[i].traits.length; j++) {
                    if (armors[i].traits[j].code === 14) armors[i].traits[j].value = 2
                }
            }
        }
        fs.writeFileSync(`${data_directory}/Armors.json`, JSON.stringify(armors, null, indent))

        // Enemies.json: resetting the default dropItems array used by RMMV, since item drops are processed by notetags instead
        let enemies = JSON.parse(fs.readFileSync(`${data_directory}/Enemies.json`))
        for (i = 1; i < enemies.length; i++) {
            enemies[i].dropItems = []
        }
        fs.writeFileSync(`${data_directory}/Enemies.json`, JSON.stringify(enemies, null, indent))

        files.forEach(file => {
            // Load file, pretty the JSON, and write it back
            const json = fs.readFileSync(`${data_directory}/${file}`)
            if (`${file}` !== ("Animations.json" || "System.json" || "MapInfos.json" || "Armors.json" || "Enemies.json")) fs.writeFileSync(`${data_directory}/${file}`, JSON.stringify(JSON.parse(json), null, indent))
            command += ` ${data_directory}/${file}`
        })

        const json = fs.readFileSync(`./${file}`)
        fs.writeFileSync(`./${file}`, JSON.stringify(JSON.parse(json), null, indent))
    })
} catch (err) {
    console.error(err)
    process.exit(1)
}
```

# Contributors NOT using RPG Maker MV
## Running the game

### Windows
Download [NW.js v0.30.0 for Windows](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-win-x64.zip) and unzip it in the root of the cloned repository. Please ensure that the file structure of `thetrail/nwjs-v0.30-win-x64` looks like this: 

![nw.js file structure](https://user-images.githubusercontent.com/44245434/184078180-8ff4d6e4-1332-4a39-b05e-6b08d768ef0c.png)

Every time you would like to play your modified game, run `PLAYTEST.bat`, located in the repository's root.

### Linux
1. Download and extract [NW.js v0.30.0 for Linux](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-linux-x64.tar.gz).
2. Move `package.json`, `package-lock.json`, and `node_modules` from the repository to the root of `nwjs-v0.30.0-linux-x64`.
3. Open `package.json` with your text editor of choice. Change the value of `"main"` to `"www/index.html"`, and the value of `"icon"` to `"www/icon/icon.png"`. Do NOT delete the commas.
4. Create a folder titled `www` inside `nwjs-v0.30.0-linux-x64`.
5. Copy/move every folder and `index.html` from the download of The Trail to `www`.
6. Run `nw` to launch the game.
