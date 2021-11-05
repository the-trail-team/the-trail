# The Trail
README in progress

# pre-commit Hook
Contributors should use this hook in order to keep files in /data/ pretty.
```
#!/usr/bin/env node

const data_directory = "data"
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
    })
    

} catch (err) {
    console.error(err)
    process.exit(1)
}
```
