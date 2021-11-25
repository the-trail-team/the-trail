# The Trail
README in progress

# How To Self-Compile
1. Download and extract the latest version of the game from your branch of choice.
2. Download and extract NW.js v0.29.0 from https://nwjs.io/blog/v0.29.0/. Do NOT download the SDK build.
3. Copy/move the `package.json` file from the download of The Trail to the root of the NW.js folder.
4. Open `package.json` with your text editor of choice.
5. Change the value of `"main"` to `"www/index.html"`, and the value of `"icon"` to `"www/icon/icon.png"`. Do NOT delete the commas.
6. Create a folder titled `www` inside the root of the NW.js folder.
7. Copy/move all the folders and `index.html` from the download of The Trail to `www`.
8. Run `nw.exe` to launch the game.
