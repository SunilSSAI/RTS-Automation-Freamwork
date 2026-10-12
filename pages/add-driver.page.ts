import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AddDriverPage extends BasePage {
  readonly pageHeading: Locator;
  readonly addDriverButton: Locator;
  readonly cancelButton: Locator;
  readonly nameInput: Locator;
  readonly transporterIdInput: Locator;
  readonly stationSelect: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByText('Add Driver', { exact: true }).first();
    this.addDriverButton = page.getByRole('button', { name: 'Add Driver', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.nameInput = page.getByPlaceholder('Enter name');
    this.transporterIdInput = page.getByPlaceholder('XXXXXXXXXXXXXX');
    this.stationSelect = page.getByRole('combobox').first();
    this.emailInput = page.getByPlaceholder('abc@xyz.com');
    this.phoneInput = page.getByPlaceholder('XXX XXX XXXX');
  }

  async navigate() {
    await this.goto('/drivers/add');
    await this.page.waitForURL(/.*\/drivers\/add/, { timeout: 20000 });
    await this.nameInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  async fillRequiredDetails(data: {
    name: string;
    transporterId: string;
    stationCode: string;
    email: string;
    phoneNumber: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.transporterIdInput.fill(data.transporterId);
    await this.stationSelect.click();
    await this.page.getByRole('option', { name: data.stationCode, exact: true }).click();
    await this.page.keyboard.press('Escape');
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phoneNumber);
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}