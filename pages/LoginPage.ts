import { type Locator, type Page, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import { RegistrationPage } from './RegistrationPage';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly ssoLoginButton: Locator;
  readonly languageSelect: Locator;
  readonly twoFactorSkipButton: Locator;
  readonly ssoEmail: Locator;
  readonly createAccountBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.languageSelect = page.getByTestId('language-select');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.ssoLoginButton = page.getByRole('button', { name: 'SSO Login' });
    this.ssoEmail = page.getByRole('textbox', { name: /email/i });
    this.twoFactorSkipButton = page.getByTestId('two-factor-authentication-splash-screen-skip');
    this.createAccountBtn = page.getByTestId('create-account-link');
  }

  async goto() {
    await this.page.goto('/login');
  }
  async skipTwoFactorAuthentication() {
    try {
      await expect(this.twoFactorSkipButton).toBeVisible({});

      await this.twoFactorSkipButton.click();
    } catch {
      // 2FA splash screen did not appear
    }
  }
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.skipTwoFactorAuthentication();
    return new HomePage(this.page);
  }
  async loginBySSO(email: string) {
    await this.ssoLoginButton.click();
    await this.ssoEmail.fill(email);
  }
  async selectEnglishLanguage() {
    await this.languageSelect.selectOption('en');
  }
  async openCustomerRegistration(): Promise<RegistrationPage> {
    await this.createAccountBtn.click();

    return new RegistrationPage(this.page);
  }
}
