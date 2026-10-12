import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * LoginPage implements the Page Object Model for RTS Fleet Login Screen.
 */
export class LoginPage extends BasePage {
  // Locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;
  readonly errorMessage: Locator;
  readonly loginHeader: Locator;

  constructor(page: Page) {
    super(page);

    // Page Elements
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.getByRole('button', { name: 'Sign In', exact: true });
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.forgotPasswordLink = page.locator('a:has-text("Forgot password"), a:has-text("Forgot Password")');
    this.errorMessage = page.locator('.toast, [role="alert"], .alert, .text-danger, .error-message');
    this.loginHeader = page.locator('h1, h2, h3, h4, .card-title, .title').filter({ hasText: /sign in|login|welcome/i });
  }

  /**
   * Navigate to the login page.
   */
  async navigate() {
    await this.goto('/auth');
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Enter email into the email input field.
   */
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Enter password into the password input field.
   */
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click on the Sign In button.
   */
  async clickSignIn() {
    await this.signInButton.click();
  }

  /**
   * Complete login action with email and password.
   */
  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  /**
   * Check if email input field is visible.
   */
  async isEmailInputVisible(): Promise<boolean> {
    return this.emailInput.isVisible();
  }

  /**
   * Check if password input field is visible.
   */
  async isPasswordInputVisible(): Promise<boolean> {
    return this.passwordInput.isVisible();
  }

  /**
   * Check if sign in button is visible.
   */
  async isSignInButtonVisible(): Promise<boolean> {
    return this.signInButton.isVisible();
  }

  /**
   * Get displayed error message text if any.
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible({ timeout: 5000 }).catch(() => false)) {
      return this.errorMessage.textContent();
    }
    return null;
  }
}
