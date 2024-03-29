# pre-commit Hook
Contributors editing with RPG Maker MV should use this hook to keep .json files properly formatted.
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

        files.forEach(file => {
            // Load file, pretty the JSON, and write it back
            const json = fs.readFileSync(`${data_directory}/${file}`)
            fs.writeFileSync(`${data_directory}/${file}`, JSON.stringify(JSON.parse(json), null, 2))
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
