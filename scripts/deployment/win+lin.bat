@echo off
echo Move the OS deployment files to the NW.js folder
pause

call node "%CD%"\deployment.js

cd ..

call node "%CD%"\pre-commit.js


cd ..

move "%CD%"\node_modules ..
move "%CD%"\.itch.toml ..
move "%CD%"\package.json ..
move "%CD%"\package-lock.json ..
move "%CD%"\thetrail.exe ..

rmdir /s /q .vscode
rmdir /s /q nwjs-v0.94.0-win-x64
rmdir /s /q save
rmdir /s /q SCREENSHOTS

del /f .gitignore
del /f CONTRIBUTING.md
del /f PLAYTEST.bat
del /f README.md
del /f supertoolsengine.html

cd ..

call npm prune --production

del /f Game.exe

rmdir /s /q "%CD%"\www\scripts