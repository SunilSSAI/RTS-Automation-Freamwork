import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * AddVehiclePage implements the Page Object Model for Add Vehicle Screen (/vehicles/add).
 */
export class AddVehiclePage extends BasePage {
  // Headings & Buttons
  readonly pageHeading: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  // Form Input Textboxes (using official data-testid)
  readonly vehicleNumberInput: Locator;
  readonly vinInput: Locator;
  readonly plateNumberInput: Locator;
  readonly registeredStateInput: Locator;

  // Dropdown Comboboxes
  readonly vehicleTypeSelect: Locator;
  readonly vehicleSubtypeSelect: Locator;
  readonly ownershipTypeSelect: Locator;
  readonly makeSelect: Locator;
  readonly modelSelect: Locator;
  readonly stationSelect: Locator;

  constructor(page: Page) {
    super(page);

    this.pageHeading = page.locator('h6, h5, h4, h3, h2, h1').filter({ hasText: /add vehicle/i });
    
    // Action Buttons
    this.saveButton = page.getByTestId('add-vehicle-submit');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' }).first();

    // Text inputs using application test IDs
    this.vehicleNumberInput = page.getByTestId('add-vehicle-input-vehicle-number');
    this.vinInput = page.getByTestId('add-vehicle-input-vin');
    this.plateNumberInput = page.getByTestId('add-vehicle-input-plate-number');
    this.registeredStateInput = page.getByTestId('add-vehicle-input-registered-state');

    // Dropdowns
    this.vehicleTypeSelect = page.locator('#vehicle-type-select, [role="combobox"]').first();
    this.vehicleSubtypeSelect = page.locator('#vehicle-subtype-select');
    this.ownershipTypeSelect = page.locator('#Ownership\\ select, [id="Ownership select"]');
    this.makeSelect = page.locator('#make-select');
    this.modelSelect = page.locator('#model-select');
    this.stationSelect = page.locator('p').filter({ hasText: /station code/i }).locator('xpath=following::div[@role="combobox"][1]');
  }

  /**
   * Navigate directly to Add Vehicle page.
   */
  async navigate() {
    await this.goto('/vehicles/add');
    await this.page.waitForURL(/.*\/vehicles\/add/, { timeout: 20000 });
  }

  /**
   * Enter Vehicle Number.
   */
  async enterVehicleNumber(number: string) {
    await this.vehicleNumberInput.fill(number);
  }

  /**
   * Enter Vehicle Identification Number (VIN).
   */
  async enterVin(vin: string) {
    await this.vinInput.fill(vin);
  }

  /**
   * Enter Plate Number.
   */
  async enterPlateNumber(plate: string) {
    await this.plateNumberInput.fill(plate);
  }

  /**
   * Enter Registered State.
   */
  async enterRegisteredState(state: string) {
    await this.registeredStateInput.fill(state);
  }

  /**
   * Click Save button to submit form.
   */
  async clickSave() {
    await this.saveButton.click();
  }

  /**
   * Click Cancel button to cancel and return.
   */
  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Check if Save button is disabled (form validation state).
   */
  async isSaveButtonDisabled(): Promise<boolean> {
    return this.saveButton.isDisabled();
  }

  /**
   * Fill basic vehicle details.
   */
  async fillBasicDetails(data: { vehicleNumber: string; vin: string; plateNumber: string; registeredState: string }) {
    if (data.vehicleNumber) await this.enterVehicleNumber(data.vehicleNumber);
    if (data.vin) await this.enterVin(data.vin);
    if (data.plateNumber) await this.enterPlateNumber(data.plateNumber);
    if (data.registeredState) await this.enterRegisteredState(data.registeredState);
  }
}
