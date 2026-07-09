const { Pool } = require('pg');

async function run() {
    const pool = new Pool({
        host: '192.168.1.138',
        user: 'postgres',
        password: 'postgres',
        port: 5433,
        database: 'fullenvios'
    });

    try {
        const { rows: pkgCount } = await pool.query('SELECT COUNT(*) FROM packages');
        const { rows: eventCount } = await pool.query('SELECT COUNT(*) FROM tracking_events');
        console.log(`Port 5433 (fullenvios):`);
        console.log(`  Packages: ${pkgCount[0].count}`);
        console.log(`  Tracking Events: ${eventCount[0].count}`);
    } catch (e) {
        console.error('Error counting on 5433:', e.message);
    } finally {
        await pool.end();
    }
}

run();
