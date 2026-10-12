import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class IncidentsPage extends BasePage {
  readonly addReportButton: Locator;
  readonly accidentReportsTab: Locator;
  readonly injuryReportsTab: Locator;

  constructor(page: Page) {
    super(page);

    this.addReportButton = page.getByRole('button', { name: 'Add Report', exact: true });
    this.accidentReportsTab = page.getByRole('link', { name: 'Accident Reports', exact: true });
    this.injuryReportsTab = page.getByRole('link', { name: 'Injury Reports', exact: true });
  }

  async navigate() {
    await this.goto('/incidents/accident');
    await this.addReportButton.waitFor({ state: 'visible', timeout: 20000 });
  }

  async openReportForm(reportType: 'Accident Report' | 'Injury Report') {
    await this.addReportButton.click();
    await this.page.getByRole('link', { name: reportType, exact: true }).click();
    const route = reportType === 'Accident Report' ? '/incidents/accident/add' : '/incidents/injury/add';
    await this.page.waitForURL(new RegExp(`${route.replaceAll('/', '\\/')}$`), { timeout: 20000 });
  }
}