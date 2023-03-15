@echo off
echo create manifest.json ...
set arg1=%1
ts-node %~dp0manifest.ts %arg1% && echo create manifest.json Finish