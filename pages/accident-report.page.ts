import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class AccidentReportPage extends BasePage {
  readonly pageHeading: Locator;
  readonly vehicleSelect: Locator;
  readonly driverSelect: Locator;
  readonly accidentTimeInput: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Add Accident', exact: true });
    this.vehicleSelect = page.getByRole('combobox', { name: 'Select Vehicle' });
    this.driverSelect = page.getByRole('combobox', { name: 'Select Driver' });
    this.accidentTimeInput = page.getByRole('textbox', { name: 'Time' });
    this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
    this.backButton = page.getByRole('button', { name: 'Back', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
  }

  async navigate() {
    await this.goto('/incidents/accident/add');
    await this.pageHeading.waitFor({ state: 'visible', timeout: 20000 });
  }

  async selectFirstOption(select: Locator) {
    await select.click();
    const firstOption = this.page.getByRole('option').first();
    await firstOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstOption.click();
  }

  async selectVehicleAndDriver() {
    await this.selectFirstOption(this.vehicleSelect);
    await this.selectFirstOption(this.driverSelect);
  }

  async clickNext() {
    await this.nextButton.click();
  }
}