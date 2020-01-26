@echo off
set WORK_DIR=%~dp0
cd /d %WORK_DIR%
python ./push_code.py %*