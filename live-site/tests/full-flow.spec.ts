import { test, expect, Page } from '@playwright/test';

/**
 * Full E2E flow: signup → onboarding → dashboard (task gen) → task → workspace prompt → submit → evaluation
 *
 * Uses a unique email per run to avoid conflicts.
 * Designed to test the complete Hungarian user journey.
 */

const TEST_EMAIL = `e2e-${Date.now()}@test.local`;
const TEST_PASSWORD = 'TestPass123!';
const TEST_NAME = 'E2E Tesztelo';

const ONBOARDING = {
  job: 'Én vagyok az irodavezető egy 30 fős marketing ügynökségnél. Kezelem a számlázást, koordinálom a meetingeket, és készítem a havi riportokat a menedzsmentnek. Emellett az onboarding folyamatot is én szervezem az új kollégáknak.',
  pain: 'A múlt héten 3 órát töltöttem azzal, hogy kézzel összeszedtem az adatokat 4 különböző Excel táblából a havi költségriporthoz. Aztán még egy órát formáztam, mire prezentálható lett.',
  morning: 'Reggel 8-kor érkezem, először végignézem az emaileket (kb. 25-30 új üzenet), megválaszolom a sürgőseket. Utána ellenőrzöm a napi naptárt, előkészítem a tárgyalót a 9 órás standupra, és kinyomtatom az agendát.',
  tools: 'Outlook, Excel, Word, Teams, SharePoint, Trello',
};

const WORKSPACE_PROMPT = 'Készíts egy rövid email sablont, amiben tájékoztatom a csapatot a következő heti csapatépítő programról. Legyen benne: dátum, helyszín, program, és RSVP kérés.';

const SUBMISSION = {
  output: `Kedves Csapat!

Szeretnélek meghívni benneteket a következő heti csapatépítő programunkra!

📅 Dátum: 2026. március 10. (kedd), 14:00-18:00
📍 Helyszín: Városligeti Café & Event, Budapest
🎯 Program: Csapat workshop + kvíz + közös vacsora

Kérlek, jelezzétek részvételeteket péntekig a Teamsben vagy válasz emailben.

Üdvözlettel,
E2E Tesztelő
Irodavezető`,
};

// Helper: wait for navigation or selector with generous timeout
async function waitForNavOrSelector(page: Page, urlPart: string, selector?: string, timeout = 30_000) {
  await Promise.race([
    page.waitForURL(`**/${urlPart}**`, { timeout }),
    selector ? page.waitForSelector(selector, { timeout }) : new Promise(() => {}),
  ]);
}

test.describe.serial('Full User Journey (HU)', () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('1. Signup with new account', async () => {
    await page.goto('/auth/signup');
    await page.waitForSelector('input[type="text"]');

    // Verify Hungarian UI
    const title = await page.textContent('h1');
    console.log('Signup page title:', title);
    expect(title).toContain('Fiók');

    // Fill form
    await page.fill('input[type="text"]', TEST_NAME);
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);

    console.log(`Signing up as: ${TEST_EMAIL}`);
    await page.click('button[type="submit"]');

    // Should redirect to onboarding (if email confirmation disabled) or show email-sent
    await page.waitForTimeout(5000);
    const url = page.url();
    console.log('After signup URL:', url);

    if (url.includes('/onboarding')) {
      console.log('Redirected to onboarding (email confirmation disabled)');
    } else {
      // Check for email-sent confirmation
      const emailSent = await page.locator('text=email').count();
      console.log('Email sent notice visible:', emailSent > 0);
      // If email confirmation is required, we can't proceed further automatically
      // Skip remaining tests
      test.skip(true, 'Email confirmation required — cannot proceed with automated flow');
    }
  });

  test('2. Complete onboarding', async () => {
    // Should be on /onboarding
    await page.waitForURL('**/onboarding**', { timeout: 10_000 });

    // Verify Hungarian UI
    const title = await page.textContent('h1');
    console.log('Onboarding page title:', title);
    expect(title).toContain('Mondd el');

    // Fill all 4 fields
    const textareas = page.locator('textarea');
    await textareas.nth(0).fill(ONBOARDING.job);
    await textareas.nth(1).fill(ONBOARDING.pain);
    await textareas.nth(2).fill(ONBOARDING.morning);

    const toolsInput = page.locator('input[type="text"]').last();
    await toolsInput.fill(ONBOARDING.tools);

    console.log('Onboarding fields filled, submitting...');
    await page.click('button[type="submit"]');

    // Should redirect to dashboard (may take a while due to profile parsing)
    await page.waitForURL('**/dashboard**', { timeout: 60_000 });
    console.log('Redirected to dashboard');
  });

  test('3. Dashboard loads and tasks generate', async () => {
    await page.waitForURL('**/dashboard**', { timeout: 10_000 });

    // Verify Hungarian UI
    const brandText = await page.locator('nav span.font-bold, nav span.text-xl').first().textContent();
    console.log('Brand text:', brandText);

    // Wait for task generation — either see tasks or generating indicator
    console.log('Waiting for tasks to generate...');

    // If empty state button appears, click it to trigger generation
    const genButton = page.locator('button:has-text("Feladatok generálása"), button:has-text("Generate Tasks")');
    if (await genButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      console.log('Empty state visible — clicking generate button');
      await genButton.click();
    }

    // Wait until we see at least one task card (link to /task/)
    await page.waitForSelector('a[href*="/task/"]', { timeout: 120_000 });

    const taskLinks = await page.locator('a[href*="/task/"]').count();
    console.log(`Tasks visible: ${taskLinks}`);
    expect(taskLinks).toBeGreaterThanOrEqual(1);

    // Check difficulty labels are in Hungarian
    const difficultyBadges = await page.locator('.rounded-full').allTextContents();
    const hunLabels = difficultyBadges.filter(t => ['kezdő', 'haladó', 'profi'].includes(t.trim()));
    console.log('Hungarian difficulty labels found:', hunLabels);
  });

  test('4. Open first task and verify content', async () => {
    // Click the first task
    const firstTask = page.locator('a[href*="/task/"]').first();
    const taskTitle = await firstTask.locator('h3').textContent();
    console.log('Opening task:', taskTitle);
    await firstTask.click();

    await page.waitForURL('**/task/**');
    await page.waitForSelector('h1');

    // Verify Hungarian section headers
    const scenarioHeader = await page.locator('text=szituáció').count();
    console.log('Hungarian scenario header found:', scenarioHeader > 0);

    // Verify instructions are in Hungarian
    const instructionText = await page.locator('text=Olvasd el figyelmesen').count();
    console.log('Hungarian instructions found:', instructionText > 0);

    // Verify workspace section is present
    const wsTitle = await page.locator('text=AI Munkaterület').count();
    console.log('Inline workspace found:', wsTitle > 0);
    expect(wsTitle).toBeGreaterThan(0);
  });

  test('5. Use inline AI workspace', async () => {
    // Find the workspace textarea
    const wsTextarea = page.locator('textarea').last();
    await wsTextarea.fill(WORKSPACE_PROMPT);

    console.log('Sending workspace prompt...');
    // Click the send button (last btn-primary with Send icon)
    const sendBtn = page.locator('button.btn-primary:has(.lucide-send), button:has(.lucide-send)').first();
    await sendBtn.click();

    // Wait for AI response (the thinking indicator should appear then disappear)
    console.log('Waiting for AI response...');
    await page.waitForSelector('text=AI válasz', { timeout: 60_000 });

    const aiResponses = await page.locator('text=AI válasz').count();
    console.log('AI responses visible:', aiResponses);
    expect(aiResponses).toBeGreaterThanOrEqual(1);

    // Check turns remaining updated
    const turnsText = await page.locator('.rounded-full').last().textContent();
    console.log('Turns indicator:', turnsText);
  });

  test('6. Navigate to submit page and submit work', async () => {
    // Click submit button
    const submitLink = page.locator('a[href*="/submit"]').first();
    await submitLink.click();

    await page.waitForURL('**/submit**');
    await page.waitForSelector('h1');

    // Verify Hungarian UI
    const title = await page.textContent('h1');
    console.log('Submit page title:', title);
    expect(title).toContain('Beadás');

    // Fill submission form — only final output textarea remains
    const textarea = page.locator('textarea');
    await textarea.fill(SUBMISSION.output);

    // Select tools
    await page.click('button:has-text("ChatGPT")');
    await page.click('button:has-text("Excel")');

    // Fill time
    await page.fill('input[type="number"]', '15');

    console.log('Submitting work...');
    await page.click('button[type="submit"]');

    // Wait for evaluation (this calls the evaluate API which takes 15-30s)
    console.log('Waiting for evaluation...');
    await page.waitForURL('**/evaluation**', { timeout: 90_000 });
    console.log('Redirected to evaluation page');
  });

  test('7. Verify evaluation page', async () => {
    await page.waitForSelector('h2', { timeout: 15_000 });

    // Check for overall score (big number)
    const scoreEl = page.locator('.text-7xl');
    const scoreText = await scoreEl.textContent();
    const score = parseInt(scoreText || '0');
    console.log('Overall score:', score);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);

    // Check score label is in Hungarian
    const allText = await page.textContent('body');
    const hasHunLabel = ['Kiváló', 'Jó', 'Fejlődő', 'Fejlesztendő'].some(l => allText?.includes(l));
    console.log('Hungarian score label found:', hasHunLabel);
    expect(hasHunLabel).toBe(true);

    // Check dimension breakdown is in Hungarian
    const hasDimLabel = allText?.includes('Kimenet minősége') || allText?.includes('AI kihasználtság');
    console.log('Hungarian dimension labels found:', hasDimLabel);
    expect(hasDimLabel).toBe(true);

    // Check score breakdown header
    const breakdownHeader = await page.locator('text=Pont részletezés').count();
    console.log('Hungarian breakdown header:', breakdownHeader > 0);

    // Check expert course link
    const expertLink = page.locator('a[href*="/course"]');
    const expertText = await expertLink.textContent();
    console.log('Expert link text:', expertText);

    console.log('=== FULL FLOW COMPLETED SUCCESSFULLY ===');
    console.log(`Score: ${score}/100`);
  });
});
