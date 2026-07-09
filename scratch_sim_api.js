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
        console.log('Simulating GET /api/packages?limit=0 ...');
        const t0 = Date.now();
        
        // 1. Fetch packages
        const { rows: packages } = await pool.query('SELECT p.*, u.name as "clientName" FROM packages p LEFT JOIN users u ON p."creatorId" = u.id ORDER BY p."updatedAt" DESC, p.id DESC');
        console.log(`Fetched ${packages.length} packages in ${Date.now() - t0}ms`);
        
        // 2. Fetch history
        const t1 = Date.now();
        const packageIds = packages.map(p => p.id);
        console.log(`Mapping ${packageIds.length} IDs took ${Date.now() - t1}ms`);
        
        const t2 = Date.now();
        // Since packageIds length is ~39,000, we check if passing it as parameters fails or how long it takes.
        const placeholders = packageIds.map((_, i) => `$${i + 1}`).join(',');
        console.log(`Generated ${packageIds.length} placeholders in ${Date.now() - t2}ms`);
        
        const t3 = Date.now();
        console.log('Running history query (this might fail if too many parameters)...');
        const { rows: allEvents } = await pool.query(`SELECT * FROM tracking_events WHERE "packageId" IN (${placeholders}) ORDER BY timestamp DESC`, packageIds);
        console.log(`History query completed in ${Date.now() - t3}ms. Returned ${allEvents.length} rows.`);

    } catch (e) {
        console.error('Error simulating API query:', e);
    } finally {
        await pool.end();
    }
}

run();
