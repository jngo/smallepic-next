import { test, expect } from '@playwright/test'

// You can override the default Playwright test timeout of 30s
// test.setTimeout(60_000);

test('homepage', async ({ page }) => {
  const response = await page.goto('https://smallepic.com')
  expect(response?.status()).toBeLessThan(400)
  await expect(page).toHaveTitle(/John Ngo - Designer, Engineer, Researcher/)
  await page.screenshot({ path: 'homepage.jpg' })
})
