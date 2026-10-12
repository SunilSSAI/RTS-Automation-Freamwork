import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { VehiclesPage } from '../pages/vehicles.page';
import { AddVehiclePage } from '../pages/add-vehicle.page';
import loginData from '../test-data/loginData.json';
import vehicleData from '../test-data/vehicleData.json';

test.describe('RTS Fleet Management - Add Vehicle Test Suite', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  let vehiclesPage: VehiclesPage;
  let addVehiclePage: AddVehiclePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    vehiclesPage = new VehiclesPage(page);
    addVehiclePage = new AddVehiclePage(page);

    // 1. Login before testing vehicle module
    await loginPage.navigate();
    const email = process.env.USER_EMAIL || loginData.validUser.email;
    const password = process.env.USER_PASSWORD || loginData.validUser.password;
    await loginPage.login(email, password);
    await dashboardPage.waitForDashboardLoad();
  });

  test('TC01: Navigate to Vehicles list and open Add Vehicle form', async ({ page }) => {
    // Navigate to vehicles list
    await vehiclesPage.navigate();
    expect(page.url()).toContain('/vehicles');
    await expect(vehiclesPage.addVehicleButton).toBeVisible();

    // Click Add Vehicle button
    await vehiclesPage.clickAddVehicle();
    expect(page.url()).toContain('/vehicles/add');
  });

  test('TC02: Verify Add Vehicle form inputs and buttons are visible', async ({ page }) => {
    await addVehiclePage.navigate();

    // Verify key input elements
    await expect(addVehiclePage.vehicleNumberInput).toBeVisible();
    await expect(addVehiclePage.vinInput).toBeVisible();
    await expect(addVehiclePage.plateNumberInput).toBeVisible();
    await expect(addVehiclePage.registeredStateInput).toBeVisible();

    // Verify action buttons
    await expect(addVehiclePage.saveButton).toBeVisible();
    await expect(addVehiclePage.cancelButton).toBeVisible();
  });

  test('TC03: Form validation when submitting empty required fields', async ({ page }) => {
    await addVehiclePage.navigate();

    // Verify that the Save button is disabled when mandatory fields are not filled
    await expect(addVehiclePage.saveButton).toBeDisabled();
  });

  test('TC04: Fill vehicle details and verify Cancel action returns to Vehicles list', async ({ page }) => {
    // Navigate via Vehicles list so history entry exists
    await vehiclesPage.navigate();
    await vehiclesPage.clickAddVehicle();

    // Fill vehicle details from test data
    await addVehiclePage.fillBasicDetails(vehicleData.newVehicle);

    // Verify entered values
    await expect(addVehiclePage.vehicleNumberInput).toHaveValue(vehicleData.newVehicle.vehicleNumber);
    await expect(addVehiclePage.vinInput).toHaveValue(vehicleData.newVehicle.vin);
    await expect(addVehiclePage.plateNumberInput).toHaveValue(vehicleData.newVehicle.plateNumber);
    await expect(addVehiclePage.registeredStateInput).toHaveValue(vehicleData.newVehicle.registeredState);

    // Click Cancel button
    await addVehiclePage.clickCancel();

    // Verify redirection back to vehicles page (lands on /vehicles or /vehicles/view)
    await page.waitForURL(/.*\/vehicles(\/view)?/, { timeout: 15000 });
    expect(page.url()).toContain('/vehicles');
    expect(page.url()).not.toContain('/vehicles/add');
  });
});
