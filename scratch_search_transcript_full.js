const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:\\Users\\Fabian\\.gemini\\antigravity\\brain\\108a877a-2dbf-4bd5-b7eb-2bd61a2803f2\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(transcriptPath)) {
    console.error("Transcript file not found:", transcriptPath);
    process.exit(1);
}

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (!line.trim()) return;
    try {
        const obj = JSON.parse(line);
        if (obj.tool_calls) {
            obj.tool_calls.forEach(call => {
                if (call.args && call.args.TargetFile && call.args.TargetFile.includes('PlcController.tsx')) {
                    console.log(`Step ${obj.step_index} (Line ${idx + 1}): tool = ${call.name}, args keys = ${Object.keys(call.args).join(', ')}`);
                    if (call.args.CodeContent) {
                        const isTruncated = call.args.CodeContent.includes('truncated');
                        console.log(`  CodeContent length: ${call.args.CodeContent.length}, isTruncated in JSON: ${isTruncated}`);
                    }
                }
            });
        }
    } catch(e) {
        // ignore
    }
});
