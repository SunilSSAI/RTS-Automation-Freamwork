import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AddAdminPage extends BasePage {
  readonly pageHeading: Locator;
  readonly addAdminButton: Locator;
  readonly cancelButton: Locator;
  readonly nameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly emailInput: Locator;
  readonly stationSelect: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByText('Add Admin', { exact: true }).first();
    this.addAdminButton = page.getByRole('button', { name: 'Add Admin', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.nameInput = page.getByPlaceholder('Enter Your Name');
    this.phoneNumberInput = page.getByPlaceholder('Phone Number');
    this.emailInput = page.getByPlaceholder('Enter Your Email');
    this.stationSelect = page.getByRole('combobox').first();
    this.passwordInput = page.getByPlaceholder('Enter your Password');
    this.confirmPasswordInput = page.getByPlaceholder('Confirm Password');
  }

  async navigate() {
    await this.goto('/profile/Admin/Add-Admin');
    await this.page.waitForURL(/.*\/profile\/Admin\/Add-Admin/, { timeout: 20000 });
    await this.nameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillRequiredDetails(data: {
    name: string;
    phoneNumber: string;
    email: string;
    stationCode: string;
    password: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.phoneNumberInput.fill(data.phoneNumber);
    await this.emailInput.fill(data.email);
    await this.stationSelect.click();
    await this.page.getByRole('option', { name: data.stationCode, exact: true }).click();
    await this.page.keyboard.press('Escape');
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}