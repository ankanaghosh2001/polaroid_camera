import { test, expect } from "@playwright/test";

test("adds sticker to polaroid", async ({ page, browserName }) => {
    
  test.skip(browserName !== "chromium");

  await page.goto("/camera?shotsCount=1");

  await page.getByRole("button", { name: "Take Image", exact: true }).click();

  await page.getByRole("button", { name: "Customize My Photos" }).click();

  await expect(page).toHaveURL(/result/);

  // Click first sticker button
  const stickerButton = page
    .getByRole("button", {
      name: /sticker/i,
    })
    .first();

  await stickerButton.click();

  // Verify sticker added
  await expect(page.locator('[data-testid="added-sticker"]')).toBeVisible();
});

test("sticker can be dragged", async ({ page, browserName }) => {

  test.skip(browserName !== "chromium");

  await page.goto("/camera?shotsCount=1");

  await page.getByRole("button", { name: "Take Image", exact: true }).click();

  await page.getByRole("button", { name: "Customize My Photos" }).click();

  await expect(page).toHaveURL(/result/);

  await page.getByRole("button", {name: /sticker/i,}).first().click();

  const sticker = page.locator('[data-testid="added-sticker"]');

  await sticker.dragTo(page.locator(".safe-border"));

  await expect(sticker).toBeVisible();
});
