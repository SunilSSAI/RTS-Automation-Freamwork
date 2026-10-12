import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * VehiclesPage represents the Vehicles list screen.
 */
export class VehiclesPage extends BasePage {
  readonly addVehicleButton: Locator;
  readonly vehiclesTable: Locator;
  readonly pageHeading: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);

    this.addVehicleButton = page.locator('button:has-text("Add Vehicle"), a[href="/vehicles/add"]').first();
    this.vehiclesTable = page.locator('table, [role="grid"], .MuiTable-root');
    this.pageHeading = page.locator('h1, h2, h3, h4, .page-title').filter({ hasText: /vehicles/i });
    this.searchInput = page.locator('input[placeholder*="search" i], input[type="search"]');
  }

  /**
   * Navigate directly to Vehicles list page.
   */
  async navigate() {
    await this.goto('/vehicles');
    await this.page.waitForURL(/.*\/vehicles/, { timeout: 20000 });
  }

  /**
   * Click Add Vehicle button to navigate to Add Vehicle form.
   */
  async clickAddVehicle() {
    await this.addVehicleButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.addVehicleButton.click();
    await this.page.waitForURL(/.*\/vehicles\/add/, { timeout: 15000 });
  }

  /**
   * Check if Add Vehicle button is visible.
   */
  async isAddVehicleButtonVisible(): Promise<boolean> {
    return this.addVehicleButton.isVisible();
  }
}
