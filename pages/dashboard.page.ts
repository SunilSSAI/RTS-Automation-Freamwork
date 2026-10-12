import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * DashboardPage implements the Page Object Model for RTS Fleet Dashboard Screen.
 */
export class DashboardPage extends BasePage {
  // Locators
  readonly dashboardHeader: Locator;
  readonly userProfileDropdown: Locator;
  readonly logoutButton: Locator;
  readonly sidebarNavigation: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardHeader = page.locator('h1, h2, h3, .page-title, .header-title').filter({ hasText: /dashboard|rts/i });
    this.userProfileDropdown = page.locator('[data-testid="user-profile"], .user-profile, .avatar, button:has(.fa-user), .dropdown-toggle');
    this.logoutButton = page.locator('text=Logout, text=Sign out, button:has-text("Logout"), a:has-text("Logout")');
    this.sidebarNavigation = page.locator('nav, .sidebar, aside');
  }

  /**
   * Verify that dashboard is loaded successfully by waiting for dashboard URL.
   */
  async waitForDashboardLoad() {
    await this.page.waitForURL(/.*dashboard.*/i, { timeout: 20000 });
  }

  /**
   * Verify dashboard is visible.
   */
  async isDashboardLoaded(): Promise<boolean> {
    try {
      await this.waitForDashboardLoad();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Perform logout action if profile dropdown and logout option are present.
   */
  async logout() {
    if (await this.userProfileDropdown.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.userProfileDropdown.click();
    }
    if (await this.logoutButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.logoutButton.click();
    }
  }
}
