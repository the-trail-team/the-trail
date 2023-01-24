#!/usr/bin/env node

const https = require('https')
const fs = require('fs')
const path = require('path')
const yauzl = require('yauzl')

const file = fs.createWriteStream("nwjs.zip")

try {
    https.get("https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-win-x64.zip", function(response) {
        console.log("Downloading...")
        response.pipe(file)
        
        file.on("finish", () => {
            file.close()
            console.log("Download finished!")
            unzip()
        })
    })

    const unzip = () => {
        console.log("Unzipping...")
        let zipPath = __dirname + `/nwjs.zip`
        let extractPath = __dirname + `/..`

        yauzl.open(zipPath, {lazyEntries: true}, function(err, zipfile) {
            if (err) throw err
            zipfile.readEntry()
            zipfile.on("entry", function(entry) {
                if (/\/$/.test(entry.fileName)) {
                    zipfile.readEntry()
                } else {
                    fs.mkdir(
                        path.join(extractPath, path.dirname(entry.fileName)),
                        { recursive: true },
                        (err) => {
                            if (err) throw err;
                            zipfile.openReadStream(entry, function (err, readStream) {
                                if (err) throw err;
                                readStream.on("end", function () {
                                    zipfile.readEntry()
                                })
                                const writer = fs.createWriteStream(
                                    path.join(extractPath, entry.fileName)
                                )
                                readStream.pipe(writer)
                            })
                        }
                    )
                }
            })
            console.log("Unzipped!")
        })
    }
} catch (err) {
    console.error(err)
    process.exit(1)
}

