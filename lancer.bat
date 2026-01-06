@echo off
echo ========================================
echo   Lancement du site Ma Coloc
echo ========================================
echo.
echo Installation des dependances...
call npm install
echo.
echo Demarrage du serveur de developpement...
echo Le site sera accessible sur http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
call npm run dev
pause

