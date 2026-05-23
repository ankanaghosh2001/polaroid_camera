import { test, expect } from "@playwright/test";

test("camera initializes", async ({ page, context, browserName }) => {
  test.skip(
    browserName !== "chromium",
    "Camera permission only supported in Chromium",
  );

  await context.grantPermissions(["camera"]);

  await page.goto("/camera");

  const video = page.locator("video");

  await expect(video).toBeVisible();
});

test("shows error when camera access fails", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "mediaDevices", {
      writable: true,

      value: {
        getUserMedia: () => Promise.reject(new Error("Permission denied")),
      },
    });
  });

  await page.goto("/camera");

  await expect(page.getByText(/camera permission denied !/i)).toBeVisible();
});

test("camera to results navigation", async ({ page, context, browserName }) => {
  test.skip(
    browserName !== "chromium",
    "Camera permission only supported in Chromium",
  );

  await context.grantPermissions(["camera"]);

  await page.goto("/camera?shotsCount=1");

  const captureButton = page.getByRole("button", {
    name: "Take Image",
    exact: true,
  });
  await captureButton.click();

  const resultsButton = page.locator("button", {
    hasText: "Customize My Photos",
  });

  await resultsButton.click();

  await expect(page).toHaveURL("/result");
});
