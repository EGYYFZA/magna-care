import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

// Run against a disposable Chrome profile on port 9223 and the local Vite server.
const pages = await (await fetch('http://127.0.0.1:9223/json/list')).json();
const page = pages.find((p) => p.type === 'page');
assert.ok(page, 'A disposable Chrome page is required');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let sequence = 0;
const pending = new Map();
const exceptions = [];
ws.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === 'Fetch.requestPaused') {
    void send('Fetch.failRequest', { requestId: message.params.requestId, errorReason: 'Failed' });
    return;
  }
  if (message.method === 'Runtime.exceptionThrown')
    exceptions.push(message.params.exceptionDetails.text);
  const request = pending.get(message.id);
  if (!request) return;
  clearTimeout(request.timeout);
  pending.delete(message.id);
  if (message.error) request.reject(new Error(JSON.stringify(message.error)));
  else request.resolve(message.result);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Timeout: ${method}`));
    }, 15000);
    pending.set(id, { resolve, reject, timeout });
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  assert.equal(result.exceptionDetails, undefined, JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const until = async (expression) => {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    if (await evaluate(expression)) return;
    await new Promise((resolve) => setTimeout(resolve, 60));
  }
  throw new Error(`Condition not met: ${expression}`);
};
const goto = async (path) => {
  await send('Page.navigate', { url: `http://127.0.0.1:5173${path}` });
  await until(
    `location.pathname + location.search === ${JSON.stringify(path)} && document.readyState === "complete" && Boolean(document.querySelector("main h1"))`,
  );
  if (path === '/')
    await until(
      'document.querySelectorAll(".orbit-card").length === 6 && document.querySelector(".ring-stage").dataset.moving === "false"',
    );
};
const screenshot = async (name) => {
  await evaluate('document.fonts.ready');
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  await writeFile(`docs/design/${name}.png`, Buffer.from(data, 'base64'));
};
const click = async (selector) => {
  assert.ok(
    await evaluate(`Boolean(document.querySelector(${JSON.stringify(selector)}))`),
    selector,
  );
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
};
const check = async (name, expression) => {
  assert.ok(await evaluate(expression), name);
  checks.push(name);
};
const checks = [];
let savedCart;
let permissionScript;
await send('Page.enable');
await send('Runtime.enable');
await send('Page.bringToFront');
try {
  await goto('/');
  savedCart = await evaluate('localStorage.getItem("magna-care-cart")');
  await evaluate('localStorage.removeItem("magna-care-cart")');
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
    [320, 812],
  ]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
    for (const path of [
      '/',
      '/products',
      '/products/1',
      '/cart',
      '/contact',
      '/products?category=health',
    ]) {
      await goto(path);
      await check(
        `No horizontal overflow at ${width}px on ${path}`,
        'document.documentElement.scrollWidth <= innerWidth',
      );
      await check(
        `Exactly one h1 on ${path} at ${width}px`,
        'document.querySelectorAll("h1").length === 1',
      );
      await check(
        `Named buttons on ${path} at ${width}px`,
        '[...document.querySelectorAll("button")].every(b => b.getAttribute("aria-label") || b.textContent.trim())',
      );
      if (path === '/') {
        await check(
          `Product picker and exploration hint are absent at ${width}px`,
          '!document.querySelector(".orbit-product-picker") && !document.body.innerText.includes("GESER UNTUK EKSPLORASI")',
        );
        await check(
          `Actions are centered with gallery controls below at ${width}px`,
          '(() => { const actions=document.querySelector(".orbit-product-actions").getBoundingClientRect(); const controls=document.querySelector(".orbit-controls").getBoundingClientRect(); return Math.abs(actions.x+actions.width/2-innerWidth/2)<1 && Math.abs(controls.x+controls.width/2-innerWidth/2)<1 && controls.top>actions.bottom; })()',
        );
      }
      if (width !== 320) {
        const name =
          path === '/'
            ? `home-${width}`
            : path.startsWith('/products?')
              ? `health-${width}`
              : `${path.replaceAll('/', '-').slice(1)}-${width}`;
        await screenshot(name);
        if (path === '/') await screenshot(`ring-${width}`);
      }
    }
  }
  await goto('/products?category=moisturizer');
  await check(
    'Category filter displays only the moisturizer',
    'document.querySelectorAll(".product-card").length === 1 && document.querySelector(".product-card h3").textContent === "Daily Moisturizer"',
  );
  await goto('/products?sort=price-desc');
  await check(
    'Descending prices start with UV Shield',
    'document.querySelector(".product-card h3").textContent === "UV Shield SPF 50"',
  );
  await goto('/products?q=tidak-ada');
  await check(
    'Empty search provides a recovery action',
    'document.querySelectorAll(".product-card").length === 0 && Boolean(document.querySelector(".empty-state button"))',
  );
  await click('.empty-state button');
  await until('document.querySelectorAll(".product-card").length === 3');
  await check('Reset removes search and restores all products', 'location.search === ""');
  await evaluate(
    '(() => { const field = document.querySelector("#search"); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(field,"hydra"); field.dispatchEvent(new Event("input",{bubbles:true})); })()',
  );
  await until('document.querySelectorAll(".product-card").length === 1');
  await check(
    'Typing updates the search URL and result',
    'location.search.includes("q=hydra") && document.querySelector(".product-card h3").textContent === "Hydra Cleanser"',
  );
  await goto('/products/999');
  await check(
    'Unknown product has a recovery link',
    'document.querySelector("main").innerText.includes("PRODUK TIDAK DITEMUKAN") && document.querySelector("main a").getAttribute("href") === "/products"',
  );
  await goto('/products/1');
  await click('.detail-copy > button');
  await until('document.querySelector(".bag-count").textContent === "1"');
  await click('.detail-copy > button');
  await until('document.querySelector(".bag-count").textContent === "2"');
  await check(
    'Repeated addition updates contextual feedback',
    'document.querySelector(".cart-notice").innerText.includes("2 produk di bag")',
  );
  await goto('/cart');
  await check(
    'Cart survives navigation and uses the correct subtotal',
    'document.querySelectorAll(".cart-item").length === 1 && document.querySelector(".summary-row strong").textContent === "Rp240.000"',
  );
  await click('button[aria-label="Tambah jumlah Hydra Cleanser"]');
  await until('document.querySelector(".summary-row strong").textContent === "Rp360.000"');
  await click('button[aria-label="Kurangi jumlah Hydra Cleanser"]');
  await until('document.querySelector(".summary-row strong").textContent === "Rp240.000"');
  checks.push('Quantity controls recalculate subtotal');
  await evaluate(
    'localStorage.setItem("magna-care-cart",JSON.stringify([{id:1,quantity:2,price:1,name:"tampered"},null,{id:99,quantity:1},{id:2,quantity:-1}]))',
  );
  await goto('/cart');
  await check(
    'Old cart preserves valid quantities and rejects invalid entries/prices',
    'document.querySelectorAll(".cart-item").length === 1 && document.querySelector(".summary-row strong").textContent === "Rp240.000" && document.querySelector(".cart-item h2").textContent === "Hydra Cleanser"',
  );
  await click('button[aria-label="Hapus Hydra Cleanser"]');
  await until('Boolean(document.querySelector(".cart-empty"))');
  checks.push('Removing the final item restores empty cart');
  await evaluate('localStorage.setItem("magna-care-cart","{")');
  await goto('/cart');
  await check(
    'Malformed storage does not crash the app',
    'Boolean(document.querySelector(".cart-empty"))',
  );
  permissionScript = (
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source:
        'Object.defineProperty(window,"localStorage",{get(){throw new DOMException("Storage denied","SecurityError")}})',
    })
  ).identifier;
  await goto('/products/1');
  await check(
    'Storage denial displays an honest session-only notice',
    'Boolean(document.querySelector(".storage-notice"))',
  );
  await click('.detail-copy > button');
  await until('document.querySelector(".bag-count").textContent === "1"');
  checks.push('Cart remains usable when storage is denied');
  await screenshot('storage-unavailable');
  await goto('/');
  await click('.orbit-product-actions .orbit-add');
  await until('document.querySelector(".bag-count").textContent === "1"');
  await check(
    'Home bag works with storage denied without growing the page',
    'Boolean(document.querySelector(".storage-notice")) && document.documentElement.scrollHeight === innerHeight',
  );
  await screenshot('ring-storage-unavailable');
  await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: permissionScript });
  permissionScript = undefined;
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Fetch.enable', {
    patterns: [{ urlPattern: '*lorel*', resourceType: 'Image', requestStage: 'Request' }],
  });
  await goto('/products/1');
  await until('Boolean(document.querySelector(".image-fallback"))');
  await check(
    'A failed image has an accessible text fallback',
    'document.querySelector(".image-fallback").getAttribute("aria-label").includes("Hydra Cleanser")',
  );
  await screenshot('image-unavailable');
  await goto('/');
  await until('document.querySelectorAll(".orbit-card--unavailable").length === 2');
  await check(
    'Ring preserves named product panels after image failure',
    'document.querySelectorAll(".orbit-card").length === 6 && document.querySelector(".orbit-card--unavailable").getAttribute("aria-label").includes("Hydra Cleanser")',
  );
  await screenshot('ring-image-unavailable');
  await send('Fetch.disable');
  await send('Network.setCacheDisabled', { cacheDisabled: false });
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await goto('/');
  await check(
    'Header menus are visible on mobile',
    '[...document.querySelectorAll(".visible-nav a")].length === 3 && [...document.querySelectorAll(".visible-nav a")].every(e=>{const r=e.getBoundingClientRect();return r.width>0 && r.top>=0 && r.bottom<innerHeight})',
  );
  await check(
    'Home occupies one viewport without a long footer',
    'document.documentElement.scrollHeight === innerHeight && !document.querySelector(".site-footer")',
  );
  await check(
    'All catalog products exist in the circular gallery',
    'new Set([...document.querySelectorAll(".orbit-card")].map(e=>e.dataset.productId)).size === 3',
  );
  await check(
    'Repeated visual panels are not duplicate keyboard stops',
    'document.querySelectorAll(".orbit-card[aria-hidden=true]").length === 3 && [...document.querySelectorAll(".orbit-card[aria-hidden=true]")].every(e=>e.tabIndex === -1)',
  );
  await check(
    'Cards have real 3D transforms and distinct depths',
    'new Set([...document.querySelectorAll(".orbit-card")].map(e=>e.style.transform)).size === 6 && [...document.querySelectorAll(".orbit-card")].every(e=>e.style.transform.includes("matrix3d"))',
  );
  await send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    x: 360,
    y: 422,
    button: 'left',
    clickCount: 1,
  });
  await new Promise((resolve) => setTimeout(resolve, 180));
  await check(
    'Holding an inactive card does not start rotation before dragging',
    'Math.abs(Number(document.querySelector(".ring-stage").dataset.angle)) < .01',
  );
  await send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: 360,
    y: 422,
    button: 'left',
    clickCount: 1,
  });
  await goto('/');
  await click('button[aria-label="Produk berikutnya"]');
  await until(
    'document.querySelector(".orbit-product-meta").textContent.trim() === "Pelembap" && document.querySelector(".ring-stage").dataset.moving === "false" && Number(document.querySelector(".ring-stage").dataset.angle) > .2',
  );
  await check(
    'Next button selects the next product',
    'document.querySelector(".orbit-product-meta").textContent.trim() === "Pelembap"',
  );
  const settledAngle = await evaluate('document.querySelector(".ring-stage").dataset.angle');
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(await evaluate('document.querySelector(".ring-stage").dataset.angle'), settledAngle);
  checks.push('Ring stops rendering motion when settled');
  await evaluate(
    '(() => { const next=document.querySelector("button[aria-label=\\"Produk berikutnya\\"]"); for(let i=0;i<3;i++)next.click(); })()',
  );
  await until(
    `document.querySelector(".ring-stage").dataset.moving === "false" && Math.abs(Number(document.querySelector(".ring-stage").dataset.angle) - ${Number(settledAngle)}) > 2.5`,
  );
  checks.push('Rapid next commands are preserved while the ring is moving');
  await evaluate('document.querySelector(".ring-stage").focus()');
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight' });
  await until(
    'document.querySelector(".orbit-product-meta").textContent.trim() === "Tabir surya" && document.querySelector(".ring-stage").dataset.moving === "false"',
  );
  checks.push('Keyboard arrow turns the ring');
  const beforeWheel = Number(await evaluate('document.querySelector(".ring-stage").dataset.angle'));
  await send('Input.dispatchMouseEvent', {
    type: 'mouseWheel',
    x: 195,
    y: 400,
    deltaX: 0,
    deltaY: 160,
  });
  await until(
    `Math.abs(Number(document.querySelector(".ring-stage").dataset.angle) - ${beforeWheel}) > .2`,
  );
  await until('document.querySelector(".ring-stage").dataset.moving === "false"');
  checks.push('Wheel rotates and snaps the ring');
  const beforeDrag = Number(await evaluate('document.querySelector(".ring-stage").dataset.angle'));
  await send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    x: 290,
    y: 400,
    button: 'left',
    clickCount: 1,
  });
  for (const x of [250, 200, 150, 100])
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x,
      y: 420,
      button: 'left',
      buttons: 1,
    });
  await send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: 100,
    y: 420,
    button: 'left',
    clickCount: 1,
  });
  await until('document.querySelector(".ring-stage").dataset.moving === "false"');
  await check(
    'Dragging turns the ring without opening a product',
    `Math.abs(Number(document.querySelector(".ring-stage").dataset.angle) - ${beforeDrag}) > .2 && !document.querySelector("dialog").open`,
  );
  const beforeTouch = Number(await evaluate('document.querySelector(".ring-stage").dataset.angle'));
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
  await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 290, y: 400 }] });
  for (const x of [250, 200, 150, 100])
    await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: 400 }] });
  await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await until('document.querySelector(".ring-stage").dataset.moving === "false"');
  await check(
    'Touch swipe turns the ring without opening a product',
    `Math.abs(Number(document.querySelector(".ring-stage").dataset.angle) - ${beforeTouch}) > .2 && !document.querySelector("dialog").open`,
  );
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });
  await evaluate('document.querySelector(".orbit-detail").focus()');
  await click('.orbit-detail');
  await until('document.querySelector("dialog").open');
  await screenshot('ring-product-dialog-390');
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await until('!document.querySelector("dialog").open');
  await check(
    'Escape closes product details and restores focus',
    'document.activeElement.classList.contains("orbit-detail")',
  );
  await click('.orbit-detail');
  await until('document.querySelector("dialog").open');
  await click('.gallery-dialog-copy > .orbit-add');
  await until(
    '!document.querySelector("dialog").open && document.querySelector(".bag-count").textContent === "1"',
  );
  checks.push('Dialog add updates the persistent bag on the same Home page');
  await goto('/?view=list');
  await check(
    'Product list stays on Home and contains every product',
    'location.pathname === "/" && document.querySelectorAll(".home-product-row").length === 3 && document.documentElement.scrollHeight === innerHeight',
  );
  await screenshot('ring-list-390');
  await goto('/');
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Tab',
    code: 'Tab',
    windowsVirtualKeyCode: 9,
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Tab',
    code: 'Tab',
    windowsVirtualKeyCode: 9,
  });
  await evaluate('document.querySelector(".skip-link").focus()');
  await check(
    'Skip link has a visible focus indicator',
    'getComputedStyle(document.activeElement).outlineStyle !== "none" && document.activeElement.getBoundingClientRect().top >= 0',
  );
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
  });
  await until('document.activeElement.id === "main-content"');
  checks.push('Keyboard skip link moves focus to main content');
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await check(
    'Reduced motion removes gallery transitions',
    'getComputedStyle(document.querySelector(".orbit-card")).transitionDuration === "0s" && getComputedStyle(document.documentElement).scrollBehavior === "auto"',
  );
  await click('button[aria-label="Produk berikutnya"]');
  await until(
    'document.querySelector(".orbit-product-meta").textContent.trim() === "Pelembap" && document.querySelector(".ring-stage").dataset.moving === "false" && Number(document.querySelector(".ring-stage").dataset.angle) > .2',
  );
  await check(
    'Reduced motion changes product without an easing loop',
    'document.querySelector(".ring-stage").dataset.moving === "false"',
  );
  await send('Emulation.setEmulatedMedia', { features: [] });
  await check(
    'Mobile add targets are at least 44px',
    '[...document.querySelectorAll(".orbit-product-actions button,.orbit-controls button")].every(b=>b.getBoundingClientRect().width>=44 && b.getBoundingClientRect().height>=44)',
  );
  await send('Emulation.setDeviceMetricsOverride', {
    width: 844,
    height: 390,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await goto('/');
  await check(
    'Home fits a phone in landscape without page scrolling',
    'document.documentElement.scrollWidth <= innerWidth && document.documentElement.scrollHeight === innerHeight',
  );
  await screenshot('ring-844-landscape');
  assert.deepEqual(exceptions, [], 'No uncaught runtime exceptions');
  checks.push('No uncaught runtime exceptions across tested states');
  await writeFile(
    'docs/design/browser-checks.json',
    JSON.stringify({ date: '2026-10-25', status: 'pass', checks }, null, 2),
  );
  console.log(`Passed ${checks.length} browser checks. Screenshots and results: docs/design/`);
} finally {
  if (permissionScript)
    await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: permissionScript });
  await send('Fetch.disable');
  await send('Emulation.setTouchEmulationEnabled', { enabled: false });
  await send('Emulation.setEmulatedMedia', { features: [] });
  await send('Network.setCacheDisabled', { cacheDisabled: false });
  await goto('/');
  if (savedCart !== undefined)
    await evaluate(
      `localStorage.${savedCart === null ? 'removeItem("magna-care-cart")' : `setItem("magna-care-cart",${JSON.stringify(savedCart)})`}`,
    );
  await goto('/');
  ws.close();
}
