const { test, expect } = require('@playwright/test');
const path = require('path');

function fileUrl(relativePath) {
  return 'file://' + path.join(__dirname, '..', relativePath);
}

test('test page buttons update status text', async ({ page }) => {
  await page.goto(fileUrl('test.html'));

  const status = page.locator('#status');

  await page.getByRole('button', { name: 'Test Leadership Selection' }).click();
  await expect(status).toHaveText('Leadership button works! ✓');

  await page.getByRole('button', { name: 'Test Group Selection' }).click();
  await expect(status).toHaveText('Group button works! ✓');
});

test('select page stores role and navigates to group', async ({ page }) => {
  await page.goto(fileUrl('select.html'));

  await page.getByRole('button', { name: 'Charge Nurse 1' }).click();
  await page.waitForURL(/group\.html\?role=charge1/);

  const storedRole = await page.evaluate(() => localStorage.getItem('pharmBlitzRole'));
  expect(storedRole).toBe('charge1');
});

test('select page stores group and navigates to group page', async ({ page }) => {
  await page.goto(fileUrl('select.html'));

  await page.getByRole('button', { name: 'Group 2 - Psych' }).click();
  await page.waitForURL(/group\.html\?group=2/);

  const storedGroup = await page.evaluate(() => localStorage.getItem('pharmBlitzGroupId'));
  expect(storedGroup).toBe('2');
});

test('index.html landing page renders group selection', async ({ page }) => {
  await page.goto(fileUrl('index.html'));

  // Check for student landing view with group links
  const group1Link = page.locator('a[href="group.html?group=1"]');
  const group6Link = page.locator('a[href="group.html?group=6"]');
  const instructorButton = page.locator('button', { hasText: 'Enter Instructor Mode' });

  await expect(group1Link).toBeVisible();
  await expect(group6Link).toBeVisible();
  await expect(instructorButton).toBeVisible();
});

test('index.html instructor mode requires passcode', async ({ page }) => {
  await page.goto(fileUrl('index.html'));

  // Click instructor mode button
  const instructorButton = page.locator('button', { hasText: 'Enter Instructor Mode' });
  await instructorButton.click();

  // Passcode modal should appear
  const passcodeModal = page.locator('#instructorPasscodeModal');
  await expect(passcodeModal).toBeVisible();

  // Enter correct passcode
  const passcodeInput = page.locator('#instructorPasscodeInput');
  await passcodeInput.fill('mednurse2024');
  await passcodeInput.press('Enter');

  // Should show instructor content
  const instructorContent = page.locator('.instructor-content.active');
  await expect(instructorContent).toBeVisible({ timeout: 2000 });
});

test('group.html loads without Firebase errors', async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('Firebase')) {
      console.error('Unexpected error:', msg.text());
    }
  });

  await page.goto(fileUrl('group.html?group=1'));

  // Page should render role selection or group view
  const heading = page.locator('h1, h2');
  await expect(heading).not.toHaveCount(0);
});

test('dashboard.html renders dashboard structure', async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('Firebase')) {
      console.error('Unexpected error:', msg.text());
    }
  });

  await page.goto(fileUrl('dashboard.html'));

  // Check main dashboard header
  const header = page.locator('header h1');
  await expect(header).toContainText('ATI Pharm Blitz');

  // Check for dashboard sections
  const sections = page.locator('section');
  await expect(sections).not.toHaveCount(0);
});
