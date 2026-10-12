import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage provides reusable utility methods for all page objects.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a relative or absolute URL path.
   */
  async goto(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for a specific URL pattern.
   */
  async waitForUrl(urlPattern: string | RegExp) {
    await this.page.waitForURL(urlPattern, { timeout: 15000 });
  }

  /**
   * Get the current browser URL.
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get the current page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Capture a full page screenshot.
   */
  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  /**
   * Wait for element to be visible.
   */
  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
  }
}
