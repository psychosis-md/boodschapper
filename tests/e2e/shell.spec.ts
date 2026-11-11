import { expect, test } from "@playwright/test";
import { expectNoAxeViolations } from "./axe";

test.describe("app shell", () => {
  test("home page renders with one h1 and a title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Boodschapper");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expectNoAxeViolations(page);
  });

  test("home page has no axe violations in dark mode", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expectNoAxeViolations(page);
  });

  test("skip link is the first tab stop and moves focus to main", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard check runs on desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
  });

  test("unknown pages show a plain-language 404", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expectNoAxeViolations(page);
  });
});
