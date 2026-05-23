import { test, expect } from "@playwright/test";

test("home page to camera navigation", async ({ page }) => {
    await page.goto("/");

    await page.getByRole('combobox').click();

    await page.getByRole('option', { name: '4' }).click();

    await page.getByRole("button", { name: /Let's Take Photos!/i }).click();

    await expect(page).toHaveURL("/camera?shotsCount=4");
})