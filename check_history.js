const jwt = require('jsonwebtoken');

const JWT_SECRET = 'fullenvios_jwt_secret_clon_2026'; // From local env
const token = jwt.sign(
  { id: '1b8997a9-509b-4cd7-bf53-730ec5d75cb4', role: 'DRIVER', name: 'Ignacio' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

async function checkHistory() {
  try {
    const url = 'http://localhost:3000/api/packages?driverFilter=1b8997a9-509b-4cd7-bf53-730ec5d75cb4&limit=0&startDate=2026-05-01&endDate=2026-05-16';
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (!res.ok) {
        console.log(`Error HTTP: ${res.status}`);
        return;
    }
    
    const data = await res.json();
    console.log(`[API RESPONSE] Total packages from API: ${data.packages.length}`);
    const delivered = data.packages.filter(p => p.status === 'ENTREGADO').length;
    console.log(`[API RESPONSE] Total Delivered: ${delivered}`);
    
    if (delivered > 0) {
        console.log("Muestra de un paquete entregado:");
        const p = data.packages.find(p => p.status === 'ENTREGADO');
        console.log(`ID: ${p.id}, createdAt: ${p.createdAt}, updatedAt: ${p.updatedAt}`);
        console.log(`Historial de eventos:`, p.history ? p.history.length : 0);
    }
  } catch (error) {
    console.error(error.message);
  }
}

checkHistory();
