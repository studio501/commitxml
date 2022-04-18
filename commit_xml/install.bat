@REM 安装切分spine工具

:: Check for Python Installation
python --version 2>NUL
if errorlevel 1 goto errorNoPython

:: Reaching here means Python is installed.
:: Execute stuff...

tar -xf TkinterDnD2\TkinterDnD2-0.3.zip

python -c "import os, sys ; from distutils.dir_util import copy_tree; python_root = os.path.dirname(sys.executable); copy_tree('TkinterDnD2/TkinterDnD2-0.3/TkinterDnD2', os.path.join(python_root, 'lib/python/site-packages/TkinterDnD2'))"

pip install -r requirements.txt --no-index

:: Once done, exit the batch file -- skips executing the errorNoPython section
goto:eof

:errorNoPython
echo.
echo Error^: Python not installed