const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function debug() {
    try {
        console.log('--- SEARCHING BY DRIVER NAME ---');
        const { rows: pkgs } = await db.query(`
            SELECT p.id, p.status, p."driverId", u.name as "driverName", p."updatedAt" 
            FROM packages p 
            JOIN users u ON p."driverId" = u.id 
            WHERE u.name ILIKE '%Ignacio Lopez%'
            ORDER BY p."updatedAt" DESC 
            LIMIT 50
        `);
        console.log('Ignacio packages (last 50):');
        console.table(pkgs);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
debug();
