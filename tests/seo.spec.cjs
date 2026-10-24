const { test, expect } = require('@playwright/test');
const production = process.env.TEST_DEV !== '1';
test('portfolio is readable without JavaScript', async ({browser, baseURL}) => {
  test.skip(!production, 'Static rendering is a production build feature');
  const context = await browser.newContext({javaScriptEnabled:false});
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.locator('h1')).toContainText('construction.');
  await expect(page.locator('#work')).toContainText('Forma');
  await expect(page.locator('#work')).toContainText('Syntax');
  await expect(page.locator('#input-wheel')).toHaveAttribute('transform', /translate\(600 244\)/);
  await expect(page.getByRole('link', {name:'harshit-vashisht on GitHub'})).toHaveAttribute('href','https://github.com/harshit-vashisht');
  await context.close();
});
test('SEO endpoints are available and source files stay private', async ({request, page}) => {
  await page.goto('/?external=1');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://harshit-vashisht.github.io/');
  for(const path of ['/robots.txt','/sitemap.xml','/og-image.png','/favicon.svg']) expect((await request.get(path)).status()).toBe(200);
  if (production) for(const path of ['/src/App.tsx','/package.json','/.env','/missing-page']) expect((await request.get(path)).status()).toBe(404);
  await page.goto('/compare.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex, follow');
});
