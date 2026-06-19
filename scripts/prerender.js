import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/services', '/tracking', '/about', '/contact'];
const PORT = 5005;

async function prerender() {
  console.log('Starting local server...');
  const serverProcess = spawn('npx', ['serve', 'dist', '-l', String(PORT)], {
    stdio: 'inherit',
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await puppeteer.launch();

  for (const route of routes) {
    const page = await browser.newPage();
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Rendering ${url}`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content();

    const outDir = route === '/' ? 'dist' : path.join('dist', route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    console.log(`Saved ${outDir}/index.html`);

    await page.close();
  }

  await browser.close();
  console.log('Prerendering complete. Shutting down local server...');

  serverProcess.kill();
  process.exit(0);
}