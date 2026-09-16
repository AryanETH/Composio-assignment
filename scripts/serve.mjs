import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const port = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  try {
    const filePath = join(distDir, 'index.html');
    const content = await readFile(filePath, 'utf8');
    
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found. Run `npm run build` first.');
  }
});

server.listen(port, () => {
  console.log(`\n🚀 Agent API Index running at http://localhost:${port}`);
  console.log(`   Press Ctrl+C to stop\n`);
});
