import { expect, test } from '@playwright/test';

test.describe('Rotaract Debre Berhan — Charity Movie Night E2E', () => {
  test('renders landing page, charity goal tracker, and PR Hall modal', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: /One Movie Night\. A Lasting Difference/i,
      })
    ).toBeVisible();

    await expect(page.getByText(/31,850 ETB/i).first()).toBeVisible();

    await page
      .getByRole('button', { name: /Campus Entry Guide/i })
      .first()
      .click();
    await expect(
      page.getByRole('dialog', { name: /PR Hall — Campus Entry Guide/i })
    ).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('completes full ticket purchase, receipt upload, and QR pass unlock', async ({
    page,
  }) => {
    await page.goto('/');

    // Enter checkout via hero CTA
    await page.getByRole('button', { name: /Get or Gift Tickets/i }).click();
    await expect(page).toHaveURL(/\/checkout\?step=1/);

    // Increase Individual pass to 2 (300 ETB)
    await page
      .getByRole('button', { name: /Increase Individual Student Pass/i })
      .click();
    await expect(page.getByText('300 ETB').first()).toBeVisible();

    // Proceed to Step 2
    await page
      .getByRole('button', { name: /Continue to Student Details/i })
      .click();
    await expect(page).toHaveURL(/\/checkout\?step=2/);

    // Fill student attendee & payment reference
    await page.getByLabel(/Your Full Name/i).fill('Abel Tesfaye');
    await page.getByLabel(/DBU Student ID/i).fill('DBU/1402/15');
    await page.getByLabel(/Department \/ College/i).fill('Software Engineering');
    await page.getByLabel(/Mobile Phone Number/i).fill('0911223344');
    await page.getByLabel(/Transaction Reference/i).fill('TBR928410');

    // Upload mock receipt image
    await page.locator('input[type="file"]').setInputFiles({
      name: 'telebirr-receipt.png',
      mimeType: 'image/png',
      buffer: Buffer.from('mock-image-bytes'),
    });

    await page
      .getByRole('button', { name: /Submit & Contribute 300 ETB/i })
      .click();

    // Step 3: Confirmation & updated live charity total (31,850 + 300 = 32,150)
    await expect(page).toHaveURL(/\/checkout\?step=3/);
    await expect(
      page.getByRole('main').getByText(/32,150 \/ 45,000 ETB/i)
    ).toBeVisible();

    // Step 4: Navigate to QR Pass Vault & simulate treasurer approval
    await page
      .getByRole('button', { name: /View & Download PR Hall QR Pass/i })
      .click();
    await expect(page).toHaveURL(/\/passes/);

    await page
      .getByRole('button', { name: /Approve Payment & Unlock QR/i })
      .click();
    await expect(page.getByText('PR Hall Verified').first()).toBeVisible();
  });

  test('supports direct deep-linking to /passes', async ({ page }) => {
    await page.goto('/passes');
    await expect(
      page.getByRole('heading', { name: /Digital PR Hall QR Passes/i })
    ).toBeVisible();
    await expect(page.getByText('RDB-2026-1042').first()).toBeVisible();
  });
});
