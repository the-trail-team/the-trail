# Contributors using RPG Maker MV
### pre-commit Hook

###### Setting up the hook
In the root of the cloned repository, navigate to `./git/hooks/`. If it doesn't already exist, create a file titled `pre-commit` (note that there is no file extension). After creating the file, open it via a text editor and paste in the hook below.

###### Using the hook
Before beginning to stage files for a commit, run `git commit` inside the terminal to activate the hook. This hook:

* Sets System.json's versionId and editMapId to constant values
* Sets all scrollX and scrollY values in MapInfos.json to 0
* "Prettifies" all .json files (except for Animation.json due to its sheer size)

After the hook runs, go ahead and stage your files, enter your title and description if needed, then commit.

###### The hook
```
#!/usr/bin/env node

const data_directory = "data"
const file = ['package.json']
let command = '';
const fs = require('fs')
const { exec } = require('child_process')
try {
    fs.readdir("data", function (err, files) {
        // Error handling
        if (err || files.length <= 0) {
            console.error(err)
            process.exit(1)
        }

        let system = JSON.parse(fs.readFileSync(`${data_directory}/System.json`))
        system.versionId = 0
        system.editMapId = 164
        fs.writeFileSync(`${data_directory}/System.json`, JSON.stringify(system, null, 2))

        let maps = JSON.parse(fs.readFileSync(`${data_directory}/MapInfos.json`))
        for (i = 1; i < maps.length; i++) {
            if (maps[i] !== null) {
                maps[i].scrollX = 0
                maps[i].scrollY = 0
            }
        }
        fs.writeFileSync(`${data_directory}/MapInfos.json`, JSON.stringify(maps, null, 2))

        files.forEach(file => {
            // Load file, pretty the JSON, and write it back
            const json = fs.readFileSync(`${data_directory}/${file}`)
            if (`${file}` !== ("Animations.json" || "System.json" || "MapInfos.json")) fs.writeFileSync(`${data_directory}/${file}`, JSON.stringify(JSON.parse(json), null, 2))
            command += ` ${data_directory}/${file}`
        })

        const json = fs.readFileSync(`./${file}`)
        fs.writeFileSync(`./${file}`, JSON.stringify(JSON.parse(json), null, 2))
    })
    

} catch (err) {
    console.error(err)
    process.exit(1)
}
```

# Contributors NOT using RPG Maker MV

### Running the game
