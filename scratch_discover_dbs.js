const { Pool } = require('pg');

async function testPort(port) {
    console.log(`\n--- Testing PostgreSQL on port ${port} ---`);
    const pool = new Pool({
        host: '192.168.1.138',
        user: 'postgres',
        password: 'postgres',
        port: port,
        database: 'postgres', // connect to default 'postgres' db first
        connectionTimeoutMillis: 5000,
    });

    try {
        const { rows: dbs } = await pool.query("SELECT datname FROM pg_database WHERE datistemplate = false");
        console.log(`Databases on port ${port}:`, dbs.map(d => d.datname).join(', '));
        
        for (const db of dbs) {
            const dbPool = new Pool({
                host: '192.168.1.138',
                user: 'postgres',
                password: 'postgres',
                port: port,
                database: db.datname,
                connectionTimeoutMillis: 5000,
            });
            try {
                const { rows: tables } = await dbPool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
                console.log(`  Database "${db.datname}" has tables:`, tables.map(t => t.table_name).join(', ') || '(none)');
                
                if (tables.some(t => t.table_name === 'users')) {
                    const { rows: count } = await dbPool.query("SELECT COUNT(*)::int as count FROM users");
                    console.log(`    users table has ${count[0].count} rows.`);
                }
            } catch (e) {
                console.log(`  Database "${db.datname}" query failed:`, e.message);
            } finally {
                await dbPool.end();
            }
        }
    } catch (err) {
        console.log(`PostgreSQL connection failed on port ${port}:`, err.message);
    } finally {
        await pool.end();
    }
}

async function run() {
    await testPort(5432);
    await testPort(5433);
    process.exit(0);
}

run();
