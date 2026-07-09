const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function check() {
    try {
        const { rows: activity } = await db.query('SELECT "driverId", count(*) FROM packages WHERE "updatedAt" >= NOW() - INTERVAL \'24 hours\' GROUP BY "driverId"');
        console.log('Driver activity last 24h:');
        console.log(activity);
        
        // Find Ignacio's ID again
        const { rows: users } = await db.query("SELECT id, name FROM users WHERE name ILIKE '%Ignacio%'");
        console.log('Users found:', users);
        
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
check();
