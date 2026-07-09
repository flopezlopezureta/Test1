const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');

async function debug() {
    try {
        const { rows: users } = await db.query("SELECT id, name, role FROM users WHERE name ILIKE '%Lopez%'");
        console.table(users);
    } catch (e) {
        console.error(e);
    } finally {
        process.exit();
    }
}
debug();
