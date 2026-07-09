const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Fabian\\.gemini\\antigravity\\brain';
if (!fs.existsSync(brainDir)) {
    console.error("Brain directory not found");
    process.exit(1);
}

const folders = fs.readdirSync(brainDir);
console.log("Searching in brain folders:");

folders.forEach(folder => {
    const fullPath = path.join(brainDir, folder);
    const stat = fs.statSync(fullPath);
    if (!stat.isDirectory()) return;

    const files = ['implementation_plan.md', 'walkthrough.md', 'task.md'];
    files.forEach(f => {
        const filePath = path.join(fullPath, f);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (content.toLowerCase().includes('plc') || content.toLowerCase().includes('ladder') || content.toLowerCase().includes('hmi')) {
                console.log(`- Match in folder: ${folder}, file: ${f}`);
                const titleLine = content.split('\n').find(l => l.startsWith('# '));
                console.log(`  Title: ${titleLine || 'No title'}`);
            }
        }
    });
});
