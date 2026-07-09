const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function debug() {
    try {
        const { rows: users } = await db.query("SELECT id, name FROM users WHERE name ILIKE '%Ignacio%'");
        console.log('Found users:', users);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
debug();
