const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8092;
const BASE_DIR = path.resolve(__dirname, '..');
const ARTIFACT_DIR = 'C:\\Users\\dhars\\.gemini\\antigravity\\brain\\bc7b3e8e-56fa-4ec2-93e9-d14783bd8ce6';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      let filePath = path.join(BASE_DIR, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const browser = await chromium.launch();
  const viewports = [320, 360, 375, 390, 430, 1280];
  const results = [];

  try {
    for (const width of viewports) {
      const page = await browser.newPage({
        viewport: { width, height: 750 },
        deviceScaleFactor: 2
      });

      // Avoid dialog popups during visual capture
      await page.addInitScript(() => {
        sessionStorage.setItem('nisha-enquiry-seen', '1');
      });

      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

      // Gather metrics on hero buttons
      const metrics = await page.evaluate(() => {
        const heroActions = document.querySelector('.hero .hero-actions');
        const callBtn = heroActions.querySelector('.btn-primary');
        const waBtn = heroActions.querySelector('.btn-light');
        const callRect = callBtn.getBoundingClientRect();
        const waRect = waBtn.getBoundingClientRect();
        const callComputed = window.getComputedStyle(callBtn);
        const waComputed = window.getComputedStyle(waBtn);
        const icon = callBtn.querySelector('.ui-icon');
        const iconRect = icon ? icon.getBoundingClientRect() : null;

        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasHorizontalOverflow = scrollWidth > docWidth;

        return {
          viewportWidth: window.innerWidth,
          hasHorizontalOverflow,
          callBtn: {
            text: callBtn.textContent.trim().replace(/\s+/g, ' '),
            width: Math.round(callRect.width),
            height: Math.round(callRect.height),
            top: Math.round(callRect.top),
            fontSize: callComputed.fontSize,
            paddingLeft: callComputed.paddingLeft,
            paddingRight: callComputed.paddingRight,
            whiteSpace: callComputed.whiteSpace,
            borderRadius: callComputed.borderRadius
          },
          waBtn: {
            text: waBtn.textContent.trim().replace(/\s+/g, ' '),
            width: Math.round(waRect.width),
            height: Math.round(waRect.height),
            top: Math.round(waRect.top),
            fontSize: waComputed.fontSize,
            paddingLeft: waComputed.paddingLeft,
            paddingRight: waComputed.paddingRight,
            whiteSpace: waComputed.whiteSpace,
            borderRadius: waComputed.borderRadius
          },
          horizontalAlignment: Math.abs(callRect.top - waRect.top) < 4,
          buttonGap: Math.round(waRect.left - callRect.right),
          icon: iconRect ? {
            width: Math.round(iconRect.width),
            height: Math.round(iconRect.height)
          } : null
        };
      });

      results.push(metrics);

      // Capture screenshot of hero section
      const screenshotPath = path.join(ARTIFACT_DIR, `hero-${width}px.png`);
      const heroElement = await page.$('.hero');
      if (heroElement) {
        await heroElement.screenshot({ path: screenshotPath });
        console.log(`Saved screenshot: ${screenshotPath}`);
      }

      await page.close();
    }

    console.log('\n--- VERIFICATION METRICS TABLE ---');
    console.table(results.map(r => ({
      Viewport: `${r.viewportWidth}px`,
      'Call WxH': `${r.callBtn.width}x${r.callBtn.height}px`,
      'WA WxH': `${r.waBtn.width}x${r.waBtn.height}px`,
      'Gap': `${r.buttonGap}px`,
      'Icon WxH': r.icon ? `${r.icon.width}x${r.icon.height}px` : 'N/A',
      'Aligned Side-by-Side': r.horizontalAlignment ? 'YES' : 'NO',
      'No Overflow': !r.hasHorizontalOverflow ? 'PASS' : 'FAIL',
      'Call Text': r.callBtn.text,
      'WA Text': r.waBtn.text
    })));

  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

