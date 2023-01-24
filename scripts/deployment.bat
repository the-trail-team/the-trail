node "%CD%"\deployment.js
node "%CD%"\pre-commit.js

cd ..

move "%CD%"\node_modules ..
move "%CD%"\.itch.toml ..
move "%CD%"\package.json ..
move "%CD%"\package-lock.json ..

rmdir /s /q .vscode
rmdir /s /q nwjs-v0.30.0-win-x64
rmdir /s /q save
rmdir /s /q SCREENSHOTS

del /f .gitignore
del /f CONTRIBUTING.md
del /f PLAYTEST.bat
del /f README.md
del /f supertoolsengine.html

cd ..

del /f Game.exe

rmdir /s /q "%CD%"\www\scripts