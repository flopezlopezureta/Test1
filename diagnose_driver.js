const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
const timeService = require('./services/timeService');

async function test() {
    try {
        const driverId = 'user-585ebd83-6f82-4d80-9cb7-d6944915cf67'; // Jairo Fuentealba
        const todayStr = await timeService.getLogicalDate();
        const { start, nextDayStart } = await timeService.getLogicalRange(todayStr, todayStr);
        
        console.log('--- TEST DATA ---');
        console.log('Driver ID:', driverId);
        console.log('Today Logical:', todayStr);
        console.log('Range Start:', start);
        console.log('Range End:', nextDayStart);

        const query = `
            SELECT id, status, "driverId", "createdAt", "assignedAt" 
            FROM packages 
            WHERE "driverId" = $1 
            AND (
                (
                    "createdAt" >= $2 AND "createdAt" < $3 OR 
                    "assignedAt" >= $2 AND "assignedAt" < $3 OR 
                    "updatedAt" >= $2 AND "updatedAt" < $3 OR 
                    "estimatedDelivery" >= $2 AND "estimatedDelivery" < $3
                ) OR (
                    status NOT IN ('ENTREGADO', 'DEVUELTO', 'CANCELADO')
                )
            )
        `;
        
        const { rows } = await db.query(query, [driverId, start, nextDayStart]);
        console.log('Packages found:', rows.length);
        console.log(JSON.stringify(rows, null, 2));

        // Check if there are ANY packages for this driver
        const { rows: allRows } = await db.query('SELECT id, status, "assignedAt" FROM packages WHERE "driverId" = $1 LIMIT 5', [driverId]);
        console.log('Sample of ANY packages for driver:', allRows);

    } catch (e) {
        console.error('ERROR:', e);
    } finally {
        process.exit();
    }
}

test();
