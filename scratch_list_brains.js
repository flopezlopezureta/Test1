const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Fabian\\.gemini\\antigravity\\brain';
if (!fs.existsSync(brainDir)) {
    console.error("Brain directory not found");
    process.exit(1);
}

const folders = fs.readdirSync(brainDir);
console.log("Found folders in brain:");
folders.forEach(folder => {
    const fullPath = path.join(brainDir, folder);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
        console.log(`- Folder: ${folder}, Created/Modified: ${stat.mtime}`);
        // Check if implementation_plan.md or walkthrough.md exists
        const planPath = path.join(fullPath, 'implementation_plan.md');
        const walkPath = path.join(fullPath, 'walkthrough.md');
        if (fs.existsSync(planPath)) {
            const planContent = fs.readFileSync(planPath, 'utf8');
            const titleLine = planContent.split('\n').find(l => l.startsWith('# '));
            console.log(`  Plan Title: ${titleLine || 'No title'}`);
        }
        if (fs.existsSync(walkPath)) {
            const walkContent = fs.readFileSync(walkPath, 'utf8');
            const titleLine = walkContent.split('\n').find(l => l.startsWith('# '));
            console.log(`  Walkthrough Title: ${titleLine || 'No title'}`);
        }
    }
});
