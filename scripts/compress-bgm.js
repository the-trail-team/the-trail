const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe");

const bgmFolder = path.join(__dirname, "..", "audio", "bgm");

function convertAudio(inputPath) {
    const outputPath = inputPath + ".tmp"; // Temporary file

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioBitrate(128)
            .toFormat("ogg")
            .on("end", () => {
                fs.renameSync(outputPath, inputPath); // Overwrite original file
                console.log(`Converted: ${path.basename(inputPath)}`);
                resolve();
            })
            .on("error", (err) => {
                console.error(`Error converting ${path.basename(inputPath)}: ${err.message}`);
                reject(err);
            })
            .save(outputPath);
    });
}

(async function processFiles() {
    if (!fs.existsSync(bgmFolder)) {
        console.error("BGM folder not found!");
        return;
    }

    const files = fs.readdirSync(bgmFolder).filter(file => file.endsWith(".ogg") || file.endsWith(".mp3"));

    for (const file of files) {
        await convertAudio(path.join(bgmFolder, file));
    }

    console.log("All files converted!");
})();
