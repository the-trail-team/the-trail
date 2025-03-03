@echo off
echo Move the files in the 'mac' folder to the Resources folder
pause
echo Open Contents/Info.plist and change CFBundleDisplayName CFBundleExecutable CFBundleName from nwjs to The Trail
pause

call node "%CD%"\deployment.js

cd ..

call node "%CD%"\pre-commit.js

cd ..

move "%CD%"\.itch.toml ..\..\..\..

rmdir /s /q .vscode
rmdir /s /q nwjs-v0.95.0-win-x64
rmdir /s /q save
rmdir /s /q SCREENSHOTS

del /f .gitignore
del /f CONTRIBUTING.md
del /f PLAYTEST.bat
del /f README.md
del /f supertoolsengine.html

call npm prune --production

rmdir /s /q "%CD%"\scripts