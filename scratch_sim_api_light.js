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
        console.log('Benchmarking optimized light query...');
        const t0 = Date.now();
        
        // Query packages without base64 photo columns
        const packageQuery = `
            SELECT 
                p.id, p."recipientName", p."recipientPhone", p.status, p."shippingType", 
                p."recipientAddress", p."recipientCommune", p."recipientCity", p.notes, 
                p."estimatedDelivery", p."createdAt", p."updatedAt", p."assignedAt", 
                p."driverId", p."creatorId", p.billed, p.source, p."meliOrderId", 
                p."wooOrderId", p."shopifyOrderId", p."jumpsellerOrderId", p."trackingId", 
                p."meliFlexCode", p."isFlexed", p."flexedAt", p."recipientRut", p."recipientEmail", 
                u.name as "clientName"
            FROM packages p 
            LEFT JOIN users u ON p."creatorId" = u.id 
            ORDER BY p."updatedAt" DESC, p.id DESC
        `;
        const { rows: packages } = await pool.query(packageQuery);
        console.log(`- Fetched ${packages.length} packages (no photos) in ${Date.now() - t0}ms`);
        
        // 2. Fetch history (only selecting packageId, status, timestamp)
        const t1 = Date.now();
        const packageIds = packages.map(p => p.id);
        const placeholders = packageIds.map((_, i) => `$${i + 1}`).join(',');
        
        // Let's only select the columns needed for tracking history
        const { rows: allEvents } = await pool.query(`
            SELECT "packageId", status, timestamp 
            FROM tracking_events 
            WHERE "packageId" IN (${placeholders}) 
            ORDER BY timestamp DESC
        `, packageIds);
        console.log(`- Fetched ${allEvents.length} history events (optimized columns) in ${Date.now() - t1}ms`);

    } catch (e) {
        console.error('Error running optimized benchmark:', e);
    } finally {
        await pool.end();
    }
}

run();
