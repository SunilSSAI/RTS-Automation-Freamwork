import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import testData from '../test-data/loginData.json';

test.describe('RTS Fleet Management - Login Test Suite', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('TC01: Verify Login Page elements are visible and ready', async ({ page }) => {
    // Verify page title / URL
    expect(page.url()).toContain('/auth');

    // Verify presence of input fields and buttons
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('TC02: Successful login with valid credentials (Happy Path)', async ({ page }) => {
    // Read credentials from env or fallback to test-data
    const email = process.env.USER_EMAIL || testData.validUser.email;
    const password = process.env.USER_PASSWORD || testData.validUser.password;

    // Perform login action
    await loginPage.login(email, password);

    // Verify navigation to dashboard
    await dashboardPage.waitForDashboardLoad();
    expect(page.url()).toContain('/dashboard');
  });

  test('TC03: Login failure with invalid password', async ({ page }) => {
    const email = testData.invalidUser.email;
    const password = testData.invalidUser.password;

    await loginPage.login(email, password);

    // Verify user is not redirected to dashboard
    await page.waitForTimeout(2000);
    expect(page.url()).not.toContain('/dashboard/view');
  });

  test('TC04: Form validation with empty credentials', async ({ page }) => {
    // Try to click Sign In without typing credentials
    await loginPage.clickSignIn();

    // Verify still on auth page
    expect(page.url()).toContain('/auth');
  });
});
