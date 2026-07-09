const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function trace() {
    try {
        const driverName = 'Ignacio Lopez';
        // Buscamos eventos donde se mencione a Ignacio en los detalles (asignaciones)
        const { rows: events } = await db.query("SELECT * FROM tracking_events WHERE details ILIKE '%Ignacio Lopez%' ORDER BY timestamp DESC LIMIT 50");
        console.log('Recent assignment events for Ignacio:');
        console.table(events);
        
        if (events.length > 0) {
            const pkgId = events[0].packageId;
            const { rows: pkg } = await db.query('SELECT * FROM packages WHERE id = $1', [pkgId]);
            console.log('Current state of one of his packages:', pkg[0]);
        }
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
trace();
