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
        const start = '2026-05-01 02:00:00';
        const end = '2026-06-01 02:00:00';
        
        // Count total packages in May 2026
        const { rows: total } = await pool.query('SELECT COUNT(*)::int as count FROM packages WHERE "createdAt" >= $1 AND "createdAt" < $2', [start, end]);
        
        // Count delivered packages in May 2026
        const { rows: delivered } = await pool.query('SELECT COUNT(*)::int as count FROM packages WHERE "createdAt" >= $1 AND "createdAt" < $2 AND status = \'ENTREGADO\'', [start, end]);
        
        // Count packages picked up in May 2026
        const { rows: pickedUp } = await pool.query(`
            SELECT COUNT(DISTINCT p.id)::int as count 
            FROM packages p
            JOIN tracking_events e ON p.id = e."packageId"
            WHERE p."createdAt" >= $1 AND p."createdAt" < $2
              AND e.status = 'RETIRADO' 
              AND e.timestamp >= $1 AND e.timestamp < $2
        `, [start, end]);

        // Count union of both (relevant packages)
        const { rows: unionCount } = await pool.query(`
            SELECT COUNT(DISTINCT p.id)::int as count 
            FROM packages p
            LEFT JOIN tracking_events e ON p.id = e."packageId" AND e.status = 'RETIRADO' AND e.timestamp >= $1 AND e.timestamp < $2
            WHERE p."createdAt" >= $1 AND p."createdAt" < $2
              AND (p.status = 'ENTREGADO' OR e.id IS NOT NULL)
        `, [start, end]);

        console.log(`Port 5433 packages in May 2026:`);
        console.log(`- Total: ${total[0].count}`);
        console.log(`- Delivered: ${delivered[0].count}`);
        console.log(`- Picked Up: ${pickedUp[0].count}`);
        console.log(`- Union (Delivered OR Picked Up): ${unionCount[0].count}`);
        
    } catch (e) {
        console.error('Error querying counts:', e.message);
    } finally {
        await pool.end();
    }
}

run();
