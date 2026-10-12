import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { AddAdminPage } from '../pages/add-admin.page';
import loginData from '../test-data/loginData.json';
import adminData from '../test-data/adminData.json';

test.describe('RTS Fleet Management - Add Admin Test Suite', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let addAdminPage: AddAdminPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addAdminPage = new AddAdminPage(page);

    await loginPage.navigate();
    const email = process.env.USER_EMAIL || loginData.validUser.email;
    const password = process.env.USER_PASSWORD || loginData.validUser.password;
    await loginPage.login(email, password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('TC01: Navigate from Settings Admins to Add Admin form', async ({ page }) => {
    await page.goto('/profile/Admin');
    await page.getByRole('button', { name: 'Add Admin', exact: true }).click();

    await page.waitForURL(/.*\/profile\/Admin\/Add-Admin/);
    await expect(addAdminPage.pageHeading).toBeVisible();
  });

  test('TC02: Verify Add Admin form fields and actions are visible', async () => {
    await addAdminPage.navigate();

    await expect(addAdminPage.nameInput).toBeVisible();
    await expect(addAdminPage.phoneNumberInput).toBeVisible();
    await expect(addAdminPage.emailInput).toBeVisible();
    await expect(addAdminPage.stationSelect).toBeVisible();
    await expect(addAdminPage.passwordInput).toBeVisible();
    await expect(addAdminPage.confirmPasswordInput).toBeVisible();
    await expect(addAdminPage.addAdminButton).toBeVisible();
    await expect(addAdminPage.cancelButton).toBeVisible();
  });

  test('TC03: Add Admin is disabled when required fields are empty', async () => {
    await addAdminPage.navigate();

    await expect(addAdminPage.addAdminButton).toBeDisabled();
  });

  test('TC04: Fill required admin details and cancel without creating an account', async ({ page }) => {
    await addAdminPage.navigate();
    await addAdminPage.fillRequiredDetails(adminData.newAdmin);

    await expect(addAdminPage.nameInput).toHaveValue(adminData.newAdmin.name);
    await expect(addAdminPage.phoneNumberInput).toHaveValue(adminData.newAdmin.phoneNumber);
    await expect(addAdminPage.emailInput).toHaveValue(adminData.newAdmin.email);
    await expect(addAdminPage.passwordInput).toHaveValue(adminData.newAdmin.password);
    await expect(addAdminPage.confirmPasswordInput).toHaveValue(adminData.newAdmin.password);

    await addAdminPage.clickCancel();
    await page.waitForURL(/.*\/profile\/Admin(?:\?.*)?$/, { timeout: 15000 });
  });
});