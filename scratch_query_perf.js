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
        console.log('Testing performance of queries:');
        
        // Query 1: All packages and tracking events (simulating limit:0 with history)
        const t0 = Date.now();
        const { rows: pkgs } = await pool.query('SELECT p.id FROM packages p');
        console.log(`- Total packages count: ${pkgs.length} (query took ${Date.now() - t0}ms)`);
        
        // Let's simulate the tracking events query for all packages
        const t1 = Date.now();
        const pkgIds = pkgs.map(p => p.id);
        const { rows: events } = await pool.query('SELECT id FROM tracking_events');
        console.log(`- Total tracking events: ${events.length} (query took ${Date.now() - t1}ms)`);

        // Query 2: Filter by a month (e.g. May 2026)
        const t2 = Date.now();
        const start = '2026-05-01 00:00:00';
        const end = '2026-05-31 23:59:59';
        const { rows: pkgsMonth } = await pool.query('SELECT p.id FROM packages p WHERE p."createdAt" >= $1 AND p."createdAt" <= $2', [start, end]);
        console.log(`- Packages in May 2026: ${pkgsMonth.length} (query took ${Date.now() - t2}ms)`);

        // Query 3: Filter by month and get history
        const t3 = Date.now();
        const monthPkgIds = pkgsMonth.map(p => p.id);
        if (monthPkgIds.length > 0) {
            const placeholders = monthPkgIds.map((_, i) => `$${i + 1}`).join(',');
            const { rows: monthEvents } = await pool.query(`SELECT id FROM tracking_events WHERE "packageId" IN (${placeholders})`, monthPkgIds);
            console.log(`- Tracking events for May 2026 packages: ${monthEvents.length} (query took ${Date.now() - t3}ms)`);
        }

    } catch (e) {
        console.error('Error running performance test:', e.message);
    } finally {
        await pool.end();
    }
}

run();
