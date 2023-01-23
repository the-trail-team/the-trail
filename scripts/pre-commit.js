#!/usr/bin/env node

// CONFIGURATION

const minify = false;

// JSON EDITING/PRETTYIFYING

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

        // Every file except Animations.json: Pretty the JSON, and write it back
        files.forEach(file => {
            const json = fs.readFileSync(`${data_directory}/${file}`)
            if (`${file}` !== "Animations.json") fs.writeFileSync(`${data_directory}/${file}`, JSON.stringify(JSON.parse(json), null, indent))
            command += ` ${data_directory}/${file}`
        })

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

        const json = fs.readFileSync(`./${file}`)
        fs.writeFileSync(`./${file}`, JSON.stringify(JSON.parse(json), null, indent))
    })
} catch (err) {
    console.error(err)
    process.exit(1)
}

// TILESETS

const tilesets_path = "data/Tilesets.json"

// Lower limits
// B tiles range from 0 - 255
// E tiles range from 768 - 1023, but 1024 - 1535 is unused data
// Etc.
const B  = 0      //      0-255:  B
const C  = 256    //    256-511:  C
const D  = 512    //    512-767:  D
const E  = 768    //   768-1023:  E
const X1 = 1024   //  1024-1535:  Nothing
const A5 = 1536   //  1536-1663:  A5
const X2 = 1664   //  1664-2047:  Nothing
const A1 = 2048   //  2048-3583:  A1
const A2 = 3584   //  3584-5119:  A2
const A3 = 5120   //  5120-6655:  A3
const A4 = 6656   //  6656-8191:  A4
const X3 = 8192   //       8192:  13-bit integer limit

//  Template object = {
//      parent: ID of template tileset
//      children: [
//          [
//              Child tileset ID,
//              Ignore all tiles before this,
//              Ignore these tiles and all tiles after
//          ],
//          [..., ..., ...]
//          [You can include as many children as you want]
//      ]
//  }

const outside = {
    parent: 2,
    children: [
        [7, E, A5],
        [8, E, A5],
        [9, E, A5],
        [11, E, A5],
        [12, E, A5]
    ]
}

const inside = {
    parent: 3,
    children: [
        [13, E, A5]
    ]
}


const dungeon = {
    parent: 4,
    children: [
        [10, E, A5]
    ]
}


try {
    let tilesets = JSON.parse(fs.readFileSync(`${tilesets_path}`))
    
    function fixFlags(obj) {
        obj.children.forEach(child => {
            flags = tilesets[child[0]].flags
            for (i = 0; i < X3; i++) {
                if (i < child[1] || i >= child[2]) flags[i] = tilesets[obj.parent].flags[i]
            }
        })
    }

    fixFlags(outside)
    fixFlags(inside)
    fixFlags(dungeon)

    // Copy flags from Dungeon B to Inside E
    flags = tilesets[3].flags
    for (i = E; i < X1; i++) {
        flags[i] = tilesets[4].flags[i - E]
    }

    // Copy D flags (Custom) to all tilesets, based off tileset 2
    flags = tilesets[2].flags
    for (i = 1; i < tilesets.length; i++) {
        for (j = D; j < E; j++) {
            tilesets[i].flags[j] = flags[j];
        }
    }

    fs.writeFileSync(`${tilesets_path}`, JSON.stringify(tilesets, null, minify))
} catch (err) {
    console.error(err)
    process.exit(1)
}
