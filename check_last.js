const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function check() {
    try {
        const { rows: pkgs } = await db.query('SELECT id, status, "driverId", "updatedAt" FROM packages ORDER BY "updatedAt" DESC LIMIT 50');
        console.log('Last 50 package updates:');
        console.table(pkgs);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
check();
