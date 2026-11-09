const fs = require('fs');

const content = fs.readFileSync('consumet.html', 'utf8');
const lines = content.split('\n');
console.log('Total lines in consumet.html:', lines.length);

// 1. Identify all script tags and their line boundaries
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
const scripts = [];
while ((match = scriptRegex.exec(content)) !== null) {
    const startLine = content.substring(0, match.index).split('\n').length;
    const scriptBody = match[1];
    const lineCount = scriptBody.split('\n').length;
    scripts.push({
        startLine,
        endLine: startLine + lineCount,
        body: scriptBody
    });
}
console.log(`Found ${scripts.length} script blocks.`);
scripts.forEach((s, i) => console.log(`  Script #${i + 1}: Lines ${s.startLine} to ${s.endLine} (${s.endLine - s.startLine} lines)`));

// 2. Extract all API endpoints called in consumet.html
const endpoints = new Set();
const fetchRegex = /(?:fetch|axios\.get|axios\.post|\.open)\s*\(\s*[`'"](\/[^`'"?#\s]+)/gi;
while ((match = fetchRegex.exec(content)) !== null) {
    endpoints.add(match[1]);
}
console.log('\n--- ALL API ENDPOINTS CALLED ---');
Array.from(endpoints).sort().forEach(ep => console.log('  ' + ep));

// 3. Extract major UI sections from HTML
const sections = [];
const sectionRegex = /<(?:section|div|main|aside)\b[^>]*(?:id=["']([^"']+)["']|data-view=["']([^"']+)["'])[^>]*>/gi;
while ((match = sectionRegex.exec(content)) !== null) {
    const id = match[1] || match[2];
    if (id && (id.startsWith('view') || id.includes('Shelf') || id.includes('Modal') || id.includes('Drawer') || id.includes('Section') || id.includes('Grid') || id.includes('Container') || id.includes('Hub') || id.includes('Player'))) {
        sections.push(id);
    }
}
console.log('\n--- KEY UI VIEWS & SHELVES ---');
Array.from(new Set(sections)).slice(0, 40).forEach(sec => console.log('  ' + sec));

// 4. Extract all defined functions
const functions = new Map();
const funcRegex = /(?:async\s+)?function\s+([a-zA-Z0-9_$]+)\s*\(([^)]*)\)/g;
while ((match = funcRegex.exec(content)) !== null) {
    const line = content.substring(0, match.index).split('\n').length;
    functions.set(match[1], { line, args: match[2].trim() });
}
const arrowFuncRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/g;
while ((match = arrowFuncRegex.exec(content)) !== null) {
    const line = content.substring(0, match.index).split('\n').length;
    if (!functions.has(match[1])) {
        functions.set(match[1], { line, args: match[2].trim() });
    }
}
console.log(`\n--- EXTRACTED ${functions.size} FUNCTIONS ---`);
let catCount = {};
for (const [name, meta] of functions.entries()) {
    let cat = 'general';
    if (name.toLowerCase().includes('sport') || name.toLowerCase().includes('match') || name.toLowerCase().includes('score')) cat = 'sports';
    else if (name.toLowerCase().includes('jtv') || name.toLowerCase().includes('channel') || name.toLowerCase().includes('live')) cat = 'livetv';
    else if (name.toLowerCase().includes('anime') || name.toLowerCase().includes('aniskip') || name.toLowerCase().includes('mal')) cat = 'anime';
    else if (name.toLowerCase().includes('torr') || name.toLowerCase().includes('magnet')) cat = 'torrent';
    else if (name.toLowerCase().includes('play') || name.toLowerCase().includes('video') || name.toLowerCase().includes('stream') || name.toLowerCase().includes('hls')) cat = 'player';
    else if (name.toLowerCase().includes('search') || name.toLowerCase().includes('filter')) cat = 'search';
    else if (name.toLowerCase().includes('modal') || name.toLowerCase().includes('drawer') || name.toLowerCase().includes('ui') || name.toLowerCase().includes('render')) cat = 'ui';
    else if (name.toLowerCase().includes('party') || name.toLowerCase().includes('chat') || name.toLowerCase().includes('sync')) cat = 'party';
    catCount[cat] = (catCount[cat] || 0) + 1;
}
console.log('Function Categories:', catCount);
