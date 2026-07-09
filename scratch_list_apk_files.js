const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const apkPath = 'c:\\IA ANTIGRAVITY\\FULLENVIOS\\Test1\\APK FullEnvios\\FullEnviosTest3.apk';
if (!fs.existsSync(apkPath)) {
    console.error("APK not found:", apkPath);
    process.exit(1);
}

console.log("Listing files in APK...");
try {
    const list = execSync(`tar -tf "${apkPath}"`).toString('utf8');
    const lines = list.split('\n');
    console.log(`Total files in APK: ${lines.length}`);
    
    // Filter lines containing "assets" or "index.html"
    const assetsFiles = lines.filter(line => line.includes('assets') || line.includes('www') || line.includes('index.html'));
    console.log("Found assets/web files:");
    assetsFiles.slice(0, 100).forEach(file => {
        console.log(`- ${file}`);
    });
    if (assetsFiles.length > 100) {
        console.log(`... and ${assetsFiles.length - 100} more assets files.`);
    }
} catch (e) {
    console.error("Error listing APK files:", e.message);
}
