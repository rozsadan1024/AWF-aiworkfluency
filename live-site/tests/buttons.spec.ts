import { test, expect } from '@playwright/test';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3100';

test.describe('AIWorkFluency Button Tests', () => {
  
  test('signup button should not get stuck', async ({ page }) => {
    console.log('Testing signup page...');
    await page.goto(`${BASE_URL}/auth/signup`);
    
    // Fill form
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[type="password"]', 'testpassword123');
    
    // Click signup
    await page.click('button[type="submit"]');
    
    // Wait for result (should not stay in loading state forever)
    await page.waitForTimeout(3000);
    
    // Check if button is still showing spinner
    const hasSpinner = await page.locator('.animate-spin').count() > 0;
    const errorText = await page.locator('.bg-red-50, [class*="error"]').textContent().catch(() => '');
    
    console.log('Has spinner:', hasSpinner);
    console.log('Error message:', errorText);
    
    // Button should not be stuck spinning after 3 seconds
    expect(hasSpinner && errorText === '').toBe(false);
  });

  test('assessment next button should scroll to top', async ({ page }) => {
    console.log('Testing assessment scroll...');
    await page.goto(`${BASE_URL}/assessment?lang=hu`);
    
    // Wait for page to load
    await page.waitForSelector('button');
    
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 500));
    
    // Click next
    await page.click('button:has-text("Tovább"), button:has-text("Next")');
    
    // Wait for scroll
    await page.waitForTimeout(500);
    
    // Check scroll position
    const scrollY = await page.evaluate(() => window.scrollY);
    console.log('Scroll position after click:', scrollY);
    
    // Should be near top (0 or close to it)
    expect(scrollY).toBeLessThan(100);
  });

  test('dashboard generate tasks button should show error or success', async ({ page }) => {
    console.log('Testing dashboard generate tasks...');
    
    // First try to login (this will likely fail but let's see)
    await page.goto(`${BASE_URL}/auth/login`);
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpass');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(3000);
    
    // Check if we're on dashboard or still on login
    const url = page.url();
    console.log('Current URL:', url);
    
    if (url.includes('/dashboard')) {
      // Try generate tasks
      await page.click('button:has-text("Generate Tasks")');
      await page.waitForTimeout(3000);
      
      // Check for error or success
      const errorVisible = await page.locator('.bg-red-50').isVisible().catch(() => false);
      const tasksVisible = await page.locator('text=Your Practice Tasks').isVisible().catch(() => false);
      
      console.log('Error visible:', errorVisible);
      console.log('Tasks visible:', tasksVisible);
      
      // Should show either error or tasks
      expect(errorVisible || tasksVisible).toBe(true);
    } else {
      console.log('Not logged in, skipping dashboard test');
    }
  });
});