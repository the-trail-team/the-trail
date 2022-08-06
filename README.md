# The Trail
The Overworld and the Above were separated hundreds of thousands of years ago, preventing the humans from contacting the Immortals. Since then, the corrupted soul of an evil god has wrought constant terror and destruction upon the Overworld.

A quiet knight with the soul of a hero, a spunky mage with never-ending enthusiasm, a reserved cleric with the blood of a champion, and a restless rogue gifted an archaic blade. Will you four be able to defy the prophecy and finally save the Overworld from its endless cycle of evil?

# How To Self-Compile
1. Download and extract the latest version of the game from your branch of choice.
2. Download and extract NW.js v0.30.0 for [Windows](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-win-x64.zip) or [Linux](https://dl.nwjs.io/v0.30.0/nwjs-v0.30.0-linux-x64.tar.gz).
3. Copy/move the `package.json` file from the download of The Trail to the root of the NW.js folder.
4. Open `package.json` with your text editor of choice.
5. Change the value of `"main"` to `"www/index.html"`, and the value of `"icon"` to `"www/icon/icon.png"`. Do NOT delete the commas.
6. Create a folder titled `www` inside the root of the NW.js folder.
7. Copy/move all the folders and `index.html` from the download of The Trail to `www`.
8. Run `nw.exe` to launch the game.
