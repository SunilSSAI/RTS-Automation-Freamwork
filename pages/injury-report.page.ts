import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InjuryReportPage extends BasePage {
  readonly pageHeading: Locator;
  readonly incidentTypeRadio: (type: string) => Locator;
  readonly driverSelect: Locator;
  readonly incidentDateInputs: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.getByRole('heading', { name: 'Add Injury', exact: true });
    this.incidentTypeRadio = (type: string) => page.getByRole('radio', { name: type, exact: true });
    this.driverSelect = page.getByRole('combobox', { name: 'Select Driver' });
    this.incidentDateInputs = page.getByRole('spinbutton');
    this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
    this.backButton = page.getByRole('button', { name: 'Previous', exact: true });
    this.submitButton = page.getByRole('button', { name: 'Submit', exact: true });
  }

  async navigate() {
    await this.goto('/incidents/injury/add');
    await this.pageHeading.waitFor({ state: 'visible', timeout: 20000 });
  }

  async selectIncidentType(type: string) {
    await this.page.getByText(type, { exact: true }).last().click();
  }

  async selectFirstDriver() {
    await this.driverSelect.click();
    const firstOption = this.page.getByRole('option').first();
    await firstOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstOption.click();
  }

  async enterCurrentIncidentDate() {
    const today = new Date();
    const monthInputs = this.page.getByRole('spinbutton', { name: 'Month' });
    const dayInputs = this.page.getByRole('spinbutton', { name: 'Day' });
    const yearInputs = this.page.getByRole('spinbutton', { name: 'Year' });

    await monthInputs.first().fill(String(today.getMonth() + 1));
    await dayInputs.first().fill(String(today.getDate()));
    await yearInputs.first().fill(String(today.getFullYear()));
  }

  async clickNext() {
    await this.nextButton.click();
  }
}