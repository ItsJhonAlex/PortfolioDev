import { test, expect } from '@playwright/test';

test('ES home renders hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Jhon');
});

test('EN route renders and switches lang', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('theme toggle persists', async ({ page }) => {
  await page.goto('/');
  await page.locator('#pf-theme-toggle').click();
  const theme = await page.evaluate(() => localStorage.getItem('pf-theme'));
  expect(theme).toBe('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('project modal opens and closes', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-project-index="0"]').click();
  await expect(page.locator('[data-modal]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-modal]')).toBeHidden({ timeout: 1500 });
});

test('language switch navigates', async ({ page }) => {
  await page.goto('/');
  await page.click('a[hreflang="en"]');
  await expect(page).toHaveURL(/\/en/);
});
