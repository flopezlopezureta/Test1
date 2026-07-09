const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function check() {
    try {
        const { rows: pkgs } = await db.query('SELECT id, status, "driverId", "updatedAt" FROM packages WHERE "updatedAt" > NOW() - INTERVAL \'2 hours\' ORDER BY "updatedAt" DESC LIMIT 50');
        console.log('Recent package updates (last 2 hours):');
        console.table(pkgs);
        
        const driverIds = [...new Set(pkgs.map(p => p.driverId))].filter(id => id !== null);
        if (driverIds.length > 0) {
            const { rows: drivers } = await db.query('SELECT id, name FROM users WHERE id ANY($1)', [driverIds]);
            console.log('Active drivers:', drivers);
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
check();
