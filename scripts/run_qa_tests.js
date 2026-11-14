const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PORT = 8089;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const WORKSPACE = path.resolve(__dirname, '..');

function startServer() {
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.json': 'application/json; charset=utf-8'
  };

  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath.endsWith('/')) {
      reqPath += 'index.html';
    }

    let filePath = path.join(WORKSPACE, reqPath);

    try {
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        res.writeHead(301, { 'Location': req.url + '/' });
        res.end();
        return;
      }
    } catch (e) {}

    fs.readFile(filePath, (err, data) => {
      if (err) {
        const notFoundPath = path.join(WORKSPACE, '404.html');
        if (fs.existsSync(notFoundPath)) {
          const notFoundData = fs.readFileSync(notFoundPath);
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(notFoundData);
        } else {
          res.writeHead(404);
          res.end('404 Not Found');
        }
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, '127.0.0.1', () => {
      console.log(`Test server running at ${BASE_URL}`);
      resolve(server);
    });
  });
}

async function runTestSuite() {
  const server = await startServer();
  const results = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    errors: [],
    details: []
  };

  function assert(condition, message, pageContext = '') {
    results.totalTests++;
    if (condition) {
      results.passed++;
      results.details.push(`[PASS] ${pageContext ? `(${pageContext}) ` : ''}${message}`);
    } else {
      results.failed++;
      const errMsg = `[FAIL] ${pageContext ? `(${pageContext}) ` : ''}${message}`;
      results.errors.push(errMsg);
      results.details.push(errMsg);
      console.error(errMsg);
    }
  }

  const browser = await chromium.launch({ headless: true });

  const pagesToTest = [
    { url: '/', name: 'Homepage' },
    { url: '/homestay-near-isha-yoga-center/', name: 'Homestay Near Isha' },
    { url: '/budget-stay-isha/', name: 'Budget Stay Near Isha' },
    { url: '/rooms-near-adiyogi/', name: 'Rooms Near Adiyogi' },
    { url: '/rooms/', name: 'Rooms & Tariff' },
    { url: '/location/', name: 'Location & Directions' }
  ];

  for (const pageInfo of pagesToTest) {
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log(`\nTesting page: ${pageInfo.name} (${pageInfo.url})`);

    const response = await page.goto(`${BASE_URL}${pageInfo.url}`, { waitUntil: 'domcontentloaded' });
    assert(response.status() === 200, `HTTP status is 200 OK (got ${response.status()})`, pageInfo.name);

    // 1. Verify complete absence of .mobile-cta
    const mobileCtaCount = await page.$$eval('.mobile-cta', els => els.length);
    assert(mobileCtaCount === 0, `Sticky bottom CTA bar (.mobile-cta) is completely removed from DOM (found ${mobileCtaCount})`, pageInfo.name);

    // 2. Title verification
    const title = await page.title();
    assert(title && title.length >= 25 && title.length <= 70, `Title tag exists and length is optimal (${title.length} chars)`, pageInfo.name);
    assert(title.includes('Nisha Home Stay'), `Title contains brand name "Nisha Home Stay"`, pageInfo.name);

    // 3. Meta description
    const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
    assert(metaDesc && metaDesc.length >= 70 && metaDesc.length <= 200, `Meta description exists and length is optimal (${metaDesc ? metaDesc.length : 0} chars)`, pageInfo.name);
    const hasCorruptChars = /\?[0-9]|5\?7|\? Near|\?1/.test(metaDesc);
    assert(!hasCorruptChars, `Meta description does not contain character encoding corruption (?)`, pageInfo.name);

    // 4. Canonical tag
    const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href')).catch(() => null);
    assert(canonical && canonical.startsWith('https://www.nishahomestay.com'), `Canonical link exists: ${canonical}`, pageInfo.name);
    assert(canonical && canonical.endsWith('/'), `Canonical ends with trailing slash: ${canonical}`, pageInfo.name);

    // 5. Headings hierarchy
    const h1s = await page.$$eval('h1', els => els.map(e => e.textContent.trim()));
    assert(h1s.length === 1, `Page has exactly one H1 tag`, pageInfo.name);
    const h2Count = await page.$$eval('h2', els => els.length);
    assert(h2Count >= 2, `Page has proper H2 subheadings (found ${h2Count})`, pageInfo.name);

    // 6. JSON-LD Structured Data
    const jsonLdScripts = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent));
    assert(jsonLdScripts.length >= 1, `JSON-LD structured data script exists`, pageInfo.name);

    let parsedSchema = null;
    try {
      parsedSchema = JSON.parse(jsonLdScripts[0]);
      assert(true, `JSON-LD parses cleanly as valid JSON`, pageInfo.name);
    } catch (e) {
      assert(false, `JSON-LD failed to parse: ${e.message}`, pageInfo.name);
    }

    if (parsedSchema) {
      const graph = parsedSchema['@graph'] || [parsedSchema];
      const lodging = graph.find(item => item['@type'] === 'LodgingBusiness');
      assert(Boolean(lodging), `LodgingBusiness entity present in schema`, pageInfo.name);
      const breadcrumbs = graph.find(item => item['@type'] === 'BreadcrumbList');
      assert(Boolean(breadcrumbs), `BreadcrumbList schema present`, pageInfo.name);
      const faq = graph.find(item => item['@type'] === 'FAQPage');
      assert(Boolean(faq), `FAQPage schema present`, pageInfo.name);
    }

    // 7. Preservation of Hero Contact Buttons & Floating WhatsApp
    const heroButtons = await page.$$eval('.hero .hero-actions a, .page-hero .hero-actions a', els => els.map(e => ({ href: e.getAttribute('href'), text: e.textContent.trim() })));
    assert(heroButtons.some(b => b.href && b.href.startsWith('tel:+916381397636')), `Hero section preserves direct Call Now button`, pageInfo.name);
    assert(heroButtons.length >= 2, `Hero section preserves secondary action button`, pageInfo.name);

    const floatWaLink = await page.$eval('.whatsapp-float', el => el.getAttribute('href')).catch(() => null);
    assert(Boolean(floatWaLink && floatWaLink.includes('wa.me/916381397636')), `Floating WhatsApp button preserved (${floatWaLink})`, pageInfo.name);

    const headerMenu = await page.$eval('.header #menuToggle', el => Boolean(el)).catch(() => false);
    assert(headerMenu, `Header hamburger menu toggle preserved`, pageInfo.name);

    // 8. Broken links & Image alts
    const imagesWithoutAlt = await page.$$eval('img:not([alt]), img[alt=""]', els => els.length);
    assert(imagesWithoutAlt === 0, `All <img> tags have non-empty descriptive alt attributes`, pageInfo.name);

    await context.close();
  }

  // 9. Multi-Width Mobile Responsiveness & Natural Scrolling Tests (320px, 360px, 375px, 390px)
  const mobileWidths = [320, 360, 375, 390];

  for (const width of mobileWidths) {
    console.log(`\nTesting Mobile Viewport at ${width}px width`);
    const mobileContext = await browser.newContext({
      viewport: { width, height: 800 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
    });
    const mobilePage = await mobileContext.newPage();
    // Pre-mark enquiry seen in sessionStorage to avoid dialog interruption
    await mobilePage.addInitScript(() => {
      sessionStorage.setItem('nisha-enquiry-seen', '1');
    });

    await mobilePage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

    // Assert .mobile-cta does not exist
    const ctaExists = await mobilePage.$eval('.mobile-cta', () => true).catch(() => false);
    assert(!ctaExists, `No .mobile-cta element in DOM at ${width}px`, `Mobile ${width}px`);

    // Assert body padding-bottom is not reserving artificial sticky bar space
    const bodyPaddingBottom = await mobilePage.evaluate(() => {
      return parseFloat(window.getComputedStyle(document.body).paddingBottom) || 0;
    });
    assert(bodyPaddingBottom < 30, `Body padding-bottom has no artificial reserved sticky bar height (${bodyPaddingBottom}px)`, `Mobile ${width}px`);

    // Verify Hamburger menu works on mobile at top of page
    await mobilePage.click('#menuToggle');
    const navActive = await mobilePage.$eval('#nav', el => el.classList.contains('active'));
    assert(navActive, `Hamburger menu opens navigation on click at ${width}px`, `Mobile ${width}px`);
    await mobilePage.click('#menuToggle');

    // Verify natural scrolling: scroll down to bottom and check footer visibility
    await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footerVisible = await mobilePage.locator('.footer').isVisible();
    assert(footerVisible, `Footer is cleanly visible and natural scrolling reaches the very bottom`, `Mobile ${width}px`);

    // Verify no horizontal overflow (scrollWidth should equal clientWidth)
    const hasHorizontalScroll = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert(!hasHorizontalScroll, `No horizontal overflow / horizontal scrollbar present at ${width}px`, `Mobile ${width}px`);

    // Verify floating WhatsApp button is visible and properly positioned at bottom right
    const floatRect = await mobilePage.$eval('.whatsapp-float', el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        visible: style.display !== 'none' && style.visibility !== 'hidden',
        bottom: window.innerHeight - rect.bottom,
        right: window.innerWidth - rect.right
      };
    });
    assert(floatRect.visible, `Floating WhatsApp button is visible at ${width}px`, `Mobile ${width}px`);
    assert(floatRect.bottom >= 0 && floatRect.bottom <= 50, `Floating WhatsApp button positioned naturally near bottom (${floatRect.bottom}px from bottom)`, `Mobile ${width}px`);

    await mobileContext.close();
  }

  // 10. Test Analytics Event Firing for Remaining Buttons
  console.log(`\nTesting GA4 Analytics Events for Remaining Contact Buttons`);
  const analyticsContext = await browser.newContext({
    viewport: { width: 375, height: 812 }
  });
  const analyticsPage = await analyticsContext.newPage();
  await analyticsPage.addInitScript(() => {
    sessionStorage.setItem('nisha-enquiry-seen', '1');
  });
  await analyticsPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

  await analyticsPage.evaluate(() => {
    window.firedEvents = [];
    window.addEventListener('seo_analytics_event', e => {
      window.firedEvents.push(e.detail);
    });
  });

  // Click Hero Call button
  await analyticsPage.locator('.hero a[href^="tel:+916381397636"]').first().dispatchEvent('click');
  const firedHeroCall = await analyticsPage.evaluate(() => {
    return window.firedEvents.find(e => e.eventName === 'click_to_call' && (e.params.cta_location === 'hero' || e.params.cta_location === 'hero_call'));
  });
  assert(Boolean(firedHeroCall), `click_to_call event fires for hero call button`, 'Analytics');
  if (firedHeroCall) {
    assert(firedHeroCall.params.destination === '+916381397636', `Hero call records destination phone number`, 'Analytics');
    assert(!firedHeroCall.params.name && !firedHeroCall.params.phone, `Hero call contains ZERO PII`, 'Analytics');
  }

  // Click Floating WhatsApp button
  await analyticsPage.locator('.whatsapp-float').dispatchEvent('click');
  const firedWaFloat = await analyticsPage.evaluate(() => {
    return window.firedEvents.find(e => e.eventName === 'whatsapp_click' && e.params.cta_location === 'floating_button');
  });
  assert(Boolean(firedWaFloat), `whatsapp_click event fires with cta_location: "floating_button"`, 'Analytics');

  // Test form interaction event: dispatch focusin on #name
  await analyticsPage.locator('#name').dispatchEvent('focusin');
  const firedStartEvent = await analyticsPage.evaluate(() => {
    return window.firedEvents.find(e => e.eventName === 'booking_form_start');
  });
  assert(Boolean(firedStartEvent), `booking_form_start event fired on form input focus`, 'Analytics');

  await analyticsContext.close();

  // 11. Test 404 response
  console.log(`\nTesting 404 Error Page Handler`);
  const errorPage = await browser.newPage();
  const errorRes = await errorPage.goto(`${BASE_URL}/non-existent-page-test/`, { waitUntil: 'domcontentloaded' });
  assert(errorRes.status() === 404, `Non-existent page returns 404 status code`, '404 Handling');
  await errorPage.close();

  await browser.close();
  server.close();

  console.log(`\n========================================`);
  console.log(`TEST RESULTS SUMMARY`);
  console.log(`Total Assertions: ${results.totalTests}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`========================================\n`);

  fs.writeFileSync(path.join(WORKSPACE, 'test_results.json'), JSON.stringify(results, null, 2));

  if (results.failed > 0) {
    console.error(`Tests failed with ${results.failed} errors.`);
    process.exit(1);
  } else {
    console.log(`All ${results.passed} tests passed successfully!`);
    process.exit(0);
  }
}

runTestSuite().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
