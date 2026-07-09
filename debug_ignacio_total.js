const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function debug() {
    try {
        const driverId = 'user-b433ccaa-89bf-46f0-94fd-75d12f38bf19';
        // Buscamos ABSOLUTAMENTE TODO lo que tenga el ID de Ignacio
        const { rows: pkgs } = await db.query('SELECT id, status, "assignedAt", "updatedAt", "createdAt" FROM packages WHERE "driverId" = $1 ORDER BY "updatedAt" DESC LIMIT 100', [driverId]);
        
        console.log('--- ALL PACKAGES FOR IGNACIO LOPEZ ---');
        console.table(pkgs);
        
        const summary = pkgs.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {});
        console.log('Summary by Status:', summary);

    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
debug();
