const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function check() {
    try {
        const { rows } = await db.query('SELECT "companyName", "meliAutoImport" FROM system_settings LIMIT 1');
        console.log('--- SYSTEM SETTINGS ---');
        console.log(rows[0]);
        
        const { rows: userCount } = await db.query('SELECT COUNT(*) FROM users');
        console.log('Total Users:', userCount[0].count);
        
        const { rows: pkgCount } = await db.query('SELECT COUNT(*) FROM packages');
        console.log('Total Packages:', pkgCount[0].count);

        const { rows: assignedSample } = await db.query('SELECT "driverId", COUNT(*) FROM packages WHERE "driverId" IS NOT NULL GROUP BY "driverId"');
        console.log('--- ASSIGNMENTS BY DRIVER ---');
        console.log(assignedSample);

    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        process.exit();
    }
}

check();
