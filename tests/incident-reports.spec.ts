import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { IncidentsPage } from '../pages/incidents.page';
import { AccidentReportPage } from '../pages/accident-report.page';
import { InjuryReportPage } from '../pages/injury-report.page';
import loginData from '../test-data/loginData.json';
import reportData from '../test-data/incidentReportData.json';

test.describe('RTS Fleet Management - Accident and Injury Reports', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let incidentsPage: IncidentsPage;
  let accidentReportPage: AccidentReportPage;
  let injuryReportPage: InjuryReportPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    incidentsPage = new IncidentsPage(page);
    accidentReportPage = new AccidentReportPage(page);
    injuryReportPage = new InjuryReportPage(page);

    await loginPage.navigate();
    const email = process.env.USER_EMAIL || loginData.validUser.email;
    const password = process.env.USER_PASSWORD || loginData.validUser.password;
    await loginPage.login(email, password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('TC01: Add Report menu opens both report forms', async ({ page }) => {
    await incidentsPage.navigate();
    await expect(incidentsPage.accidentReportsTab).toBeVisible();
    await expect(incidentsPage.injuryReportsTab).toBeVisible();

    await incidentsPage.openReportForm('Accident Report');
    await expect(accidentReportPage.pageHeading).toBeVisible();

    await incidentsPage.navigate();
    await incidentsPage.openReportForm('Injury Report');
    await expect(injuryReportPage.pageHeading).toBeVisible();
  });

  test('TC02: Complete Accident Report wizard up to Submit', async ({ page }) => {
    await accidentReportPage.navigate();
    await expect(accidentReportPage.vehicleSelect).toBeVisible();
    await expect(accidentReportPage.driverSelect).toBeVisible();
    await accidentReportPage.selectVehicleAndDriver();
    await accidentReportPage.accidentTimeInput.fill(reportData.accident.time);

    await accidentReportPage.clickNext();
    await expect(page.getByRole('heading', { name: 'Upload pictures/videos of the damage of your vehicle' })).toBeVisible();
    await accidentReportPage.clickNext();
    await expect(page.getByText('OTHER DRIVER’S INFORMATION:', { exact: true })).toBeVisible();
    await accidentReportPage.clickNext();
    await expect(page.getByText('CLAIM INFORMATION', { exact: true })).toBeVisible();
    await expect(accidentReportPage.submitButton).toBeVisible();

    await incidentsPage.navigate();
  });

  test('TC03: Complete Injury Report wizard up to Submit', async ({ page }) => {
    await injuryReportPage.navigate();
    await expect(injuryReportPage.incidentTypeRadio(reportData.injury.incidentType)).toBeVisible();
    await injuryReportPage.selectIncidentType(reportData.injury.incidentType);
    await expect(injuryReportPage.incidentTypeRadio(reportData.injury.incidentType)).toBeChecked();
    await injuryReportPage.selectFirstDriver();

    await injuryReportPage.clickNext();
    await expect(page.getByText('BODY PART AFFECTED', { exact: true })).toBeVisible();
    await injuryReportPage.clickNext();
    await expect(page.getByText('VEHICLE VIN AND VAN NO.', { exact: true })).toBeVisible();
    await injuryReportPage.clickNext();
    await expect(page.getByText('DATE OF INCIDENT/EVENT *', { exact: true })).toBeVisible();
    await injuryReportPage.enterCurrentIncidentDate();
    await injuryReportPage.clickNext();
    await expect(page.getByText('WHAT IMMEDIATE CAUSES CONTRIBUTED TO THE INCIDENT/EVENT?', { exact: true })).toBeVisible();
    await expect(injuryReportPage.submitButton).toBeVisible();

    await incidentsPage.navigate();
  });
});