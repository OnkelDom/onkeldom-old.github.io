import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://lenhardt.cc/
  await page.goto('https://lenhardt.cc/');

  // Click #site-nav >> text=Über mich
  await page.locator('#site-nav >> text=Über mich').click();
  await expect(page).toHaveURL('https://lenhardt.cc/about/');

  // Click text=Ausbildungen
  await page.locator('text=Ausbildungen').click();
  await expect(page).toHaveURL('https://lenhardt.cc/about/education/');

  // Click text=Impressum
  await page.locator('text=Impressum').click();
  await expect(page).toHaveURL('https://lenhardt.cc/impressum/');

  // Click text=Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:Permalink
  await page.locator('text=Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:Permalink').click();

  // Click button:has-text("Toggle search")
  await page.locator('button:has-text("Toggle search")').click();

  // Fill [placeholder="Suchbegriff eingeben\.\.\."]
  await page.locator('[placeholder="Suchbegriff eingeben\\.\\.\\."]').fill('Linux');

  // Press Enter
  await page.locator('[placeholder="Suchbegriff eingeben\\.\\.\\."]').press('Enter');

  // Click text=Hochverfuegbares Raspberry PI Home Cluster
  await page.locator('text=Hochverfuegbares Raspberry PI Home Cluster').click();
  await expect(page).toHaveURL('https://lenhardt.cc/blog/hochverfuegbares-raspberry-pi-home-cluster');

  // Click a:has-text("Server #2")
  await page.locator('a:has-text("Server #2")').click();
  await expect(page).toHaveURL('https://lenhardt.cc/blog/hochverfuegbares-raspberry-pi-home-cluster#server-2');

  // Click text=192.168.1.10/26 (alle Services)
  await page.locator('text=192.168.1.10/26 (alle Services)').click();

  // Click text=ubuntu
  await page.locator('text=ubuntu').click();
  await expect(page).toHaveURL('https://lenhardt.cc/categories/#ubuntu');

  // Click #cloudflare >> text=Reverse Proxy Github Pages mit Cloudflare
  await page.locator('#cloudflare >> text=Reverse Proxy Github Pages mit Cloudflare').click();
  await expect(page).toHaveURL('https://lenhardt.cc/blog/reverse-proxy-github-pages-mit-cloudflare');

  // Click a:has-text("Cloudflare DNS")
  await page.locator('a:has-text("Cloudflare DNS")').click();
  await expect(page).toHaveURL('https://lenhardt.cc/blog/reverse-proxy-github-pages-mit-cloudflare#cloudflare-dns');

  // Click text=Feed
  await page.locator('text=Feed').click();
  await expect(page).toHaveURL('https://lenhardt.cc/feed.xml');

});