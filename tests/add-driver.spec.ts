import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { AddDriverPage } from '../pages/add-driver.page';
import loginData from '../test-data/loginData.json';
import driverData from '../test-data/driverData.json';

test.describe('RTS Fleet Management - Add Driver Test Suite', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let addDriverPage: AddDriverPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addDriverPage = new AddDriverPage(page);

    await loginPage.navigate();
    const email = process.env.USER_EMAIL || loginData.validUser.email;
    const password = process.env.USER_PASSWORD || loginData.validUser.password;
    await loginPage.login(email, password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('TC01: Navigate from Drivers list to Add Driver form', async ({ page }) => {
    await page.goto('/drivers?view-driver=0');
    await page.getByRole('link', { name: 'Add Driver' }).click();

    await page.waitForURL(/.*\/drivers\/add/);
    await expect(addDriverPage.pageHeading).toBeVisible();
  });

  test('TC02: Verify Add Driver form fields and actions are visible', async () => {
    await addDriverPage.navigate();

    await expect(addDriverPage.nameInput).toBeVisible();
    await expect(addDriverPage.transporterIdInput).toBeVisible();
    await expect(addDriverPage.stationSelect).toBeVisible();
    await expect(addDriverPage.emailInput).toBeVisible();
    await expect(addDriverPage.phoneInput).toBeVisible();
    await expect(addDriverPage.addDriverButton).toBeVisible();
    await expect(addDriverPage.cancelButton).toBeVisible();
  });

  test('TC03: Add Driver is disabled when required fields are empty', async () => {
    await addDriverPage.navigate();

    await expect(addDriverPage.addDriverButton).toBeDisabled();
  });

  test('TC04: Fill required driver details and cancel without creating a record', async ({ page }) => {
    await addDriverPage.navigate();
    await addDriverPage.fillRequiredDetails(driverData.newDriver);

    await expect(addDriverPage.nameInput).toHaveValue(driverData.newDriver.name);
    await expect(addDriverPage.transporterIdInput).toHaveValue(driverData.newDriver.transporterId);
    await expect(addDriverPage.emailInput).toHaveValue(driverData.newDriver.email);
    await expect(addDriverPage.phoneInput).toHaveValue(driverData.newDriver.phoneNumber);
    await expect(addDriverPage.addDriverButton).toBeEnabled();

    await addDriverPage.clickCancel();
    await page.waitForURL(/.*\/drivers(\?.*)?$/, { timeout: 15000 });
  });
});