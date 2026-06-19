import puppeteer from 'puppeteer';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/services', '/tracking', '/about', '/contact'];
const PORT = 5005;

function run(cmd) {
  return new Promise((resolve, reject) => {
    const proc = exec(cmd);
    proc.stdout.on('data', d => process.stdout.write(d));
    proc.stderr.on('data', d => process.stderr.write(d));
    setTimeout(resolve, 2000); // give server time to boot
  });
}

async function prerender() {
  console.log('Starting local server...');
  run(`npx serve dist -l ${PORT}`);
  await new Promise(r => setTimeout(r, 2000));

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

    await page.close();
  }

  await browser.close();
  console.log('Prerendering complete.');
  process.exit(0);
}

prerender();