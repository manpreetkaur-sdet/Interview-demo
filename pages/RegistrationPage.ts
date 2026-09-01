import { type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyAndLegalForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly acceptCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly confirmEmailMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByTestId('first_name-input');
    this.lastNameInput = page.getByTestId('last_name-input');
    this.companyAndLegalForm = page.getByTestId('company_name-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.acceptCheckbox = page.getByTestId('terms-and-condition-checkbox');
    this.createAccountButton = page.getByTestId('create-account-button');
    this.confirmEmailMessage = page.getByRole('heading', {
      name: /Please confirm your email address|Bitte bestätige deine E-Mail Adresse/i,
    });

    this.emailError = page.getByTestId('email-error');
    this.passwordError = page.getByTestId('password-error');
  }

  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterCompanyAndLegalForm(companyName: string) {
    await this.companyAndLegalForm.fill(companyName);
  }

  async enterNewEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async acceptTermsAndConditions() {
    await this.acceptCheckbox.check();
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
