const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function check() {
    try {
        // Buscamos paquetes que están en tránsito pero no tienen conductor
        const { rows: pkgs } = await db.query('SELECT id FROM packages WHERE status = \'EN_TRANSITO\' AND "driverId" IS NULL ORDER BY "updatedAt" DESC LIMIT 10');
        
        for (const pkg of pkgs) {
            console.log('--- Tracing Package:', pkg.id, '---');
            const { rows: events } = await db.query('SELECT * FROM tracking_events WHERE "packageId" = $1 ORDER BY timestamp DESC', [pkg.id]);
            console.table(events);
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
check();
