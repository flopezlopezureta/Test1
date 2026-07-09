const fs = require('fs');
try {
    const dotenvContent = fs.readFileSync('c:\\IA ANTIGRAVITY\\FULLENVIOS\\Test1\\.env', 'utf8');
    dotenvContent.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length === 2) {
            process.env[parts[0].trim()] = parts[1].trim();
        }
    });
} catch (e) {
    console.error('Error loading .env:', e.message);
}

const db = require('c:\\IA ANTIGRAVITY\\FULLENVIOS\\Test1\\db');

async function run() {
    try {
        const { rows } = await db.query(`
            SELECT u.id, u.name, u.email, u.role, u.status
            FROM users u
            ORDER BY u.name ASC
        `);
        console.log('QUERY SUCCESS (Test1 DB). Returned ' + rows.length + ' rows.');
        console.log('Sample client users in Test1:');
        console.log(JSON.stringify(rows.filter(r => r.role === 'CLIENT').slice(0, 10), null, 2));
    } catch (err) {
        console.error('QUERY FAILED (Test1 DB):', err);
    }
    process.exit(0);
}

run();
