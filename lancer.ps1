Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Lancement du site Ma Coloc" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Installation des dependances..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Demarrage du serveur de developpement..." -ForegroundColor Green
Write-Host "Le site sera accessible sur http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur Ctrl+C pour arreter le serveur" -ForegroundColor Yellow
Write-Host ""

npm run dev

