const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8095;
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
        viewport: { width, height: 800 },
        deviceScaleFactor: 2
      });

      // Avoid dialog popups
      await page.addInitScript(() => {
        sessionStorage.setItem('nisha-enquiry-seen', '1');
      });

      await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });

      // Measure footer and card metrics
      const metrics = await page.evaluate(() => {
        const footer = document.querySelector('footer.footer');
        const card = footer.querySelector('.dev-promo-card');
        const footerBottom = footer.querySelector('.footer-bottom');
        const callBtn = card.querySelector('.dev-card-call');
        const instaBtn = card.querySelector('.dev-card-insta');
        const brand = card.querySelector('.dev-card-brand');

        const cardRect = card.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        const bottomRect = footerBottom.getBoundingClientRect();
        const callRect = callBtn.getBoundingClientRect();
        const instaRect = instaBtn.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(card);
        const footerStyle = window.getComputedStyle(footer);
        const bottomStyle = window.getComputedStyle(footerBottom);
        const brandStyle = window.getComputedStyle(brand);

        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const hasHorizontalOverflow = scrollWidth > docWidth;

        // Bottom space from bottom of text in footerBottom to bottom of footer
        const bottomEmptySpace = Math.round(footerRect.bottom - bottomRect.bottom);

        // Check horizontal alignment of the two buttons
        const isSideBySide = Math.abs(callRect.top - instaRect.top) < 4;

        return {
          viewport: window.innerWidth,
          hasHorizontalOverflow,
          card: {
            width: Math.round(cardRect.width),
            height: Math.round(cardRect.height),
            isCentered: Math.abs((window.innerWidth - cardRect.width) / 2 - cardRect.left) < 10
          },
          brand: {
            text: brand.textContent.trim(),
            fontSize: brandStyle.fontSize,
            fontWeight: brandStyle.fontWeight
          },
          callBtn: {
            text: callBtn.textContent.trim().replace(/\s+/g, ' '),
            href: callBtn.getAttribute('href'),
            width: Math.round(callRect.width),
            height: Math.round(callRect.height)
          },
          instaBtn: {
            text: instaBtn.textContent.trim().replace(/\s+/g, ' '),
            href: instaBtn.getAttribute('href'),
            target: instaBtn.getAttribute('target'),
            width: Math.round(instaRect.width),
            height: Math.round(instaRect.height)
          },
          isSideBySide,
          buttonGap: Math.round(instaRect.left - callRect.right),
          bottomEmptySpace
        };
      });

      results.push(metrics);

      // Scroll to bottom and take screenshot of the entire footer
      const footerElement = await page.$('footer.footer');
      if (footerElement) {
        await footerElement.scrollIntoViewIfNeeded();
        const screenshotPath = path.join(ARTIFACT_DIR, `footer-${width}px.png`);
        await footerElement.screenshot({ path: screenshotPath });
        console.log(`Saved screenshot: ${screenshotPath}`);
      }

      // Verification of Link navigation on 375px
      if (width === 375) {
        const [instaPopup] = await Promise.all([
          page.waitForEvent('popup').catch(() => null),
          page.click('.dev-card-insta')
        ]);
        if (instaPopup) {
          console.log(`Instagram link opened successfully: ${instaPopup.url()}`);
          await instaPopup.close();
        }
      }

      await page.close();
    }

    console.log('\n--- DRAFT & DEPLOY CONTACT BUTTONS VERIFICATION TABLE ---');
    console.table(results.map(r => ({
      Viewport: `${r.viewport}px`,
      'Call Label': r.callBtn.text,
      'Call Action': r.callBtn.href,
      'Insta Label': r.instaBtn.text,
      'Insta Action': r.instaBtn.href,
      'Call WxH': `${r.callBtn.width}x${r.callBtn.height}px`,
      'Insta WxH': `${r.instaBtn.width}x${r.instaBtn.height}px`,
      'Side-by-Side': r.isSideBySide ? 'YES' : 'NO',
      'Button Gap': `${r.buttonGap}px`,
      'Zero Overflow': !r.hasHorizontalOverflow ? 'PASS' : 'FAIL'
    })));

  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
