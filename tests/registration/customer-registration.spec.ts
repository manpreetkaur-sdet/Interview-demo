import { test, expect } from '../../setup/auth.fixtures';
import {
  createCustomerData,
  invalidEmails,
  invalidPasswords,
  emailValidationError,
  passwordValidationError,
} from '../../test-data/customer.data';

test.describe('Customer Registration', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // =========================================================
  // Positive Registration
  // =========================================================

  test('Customer can successfully register', async ({ loginPage }) => {
    const customer = createCustomerData();

    const registrationPage = await loginPage.openCustomerRegistration();

    await registrationPage.enterFirstName(customer.firstName);
    await registrationPage.enterLastName(customer.lastName);
    await registrationPage.enterCompanyAndLegalForm(customer.companyName);
    await registrationPage.enterNewEmail(customer.email);
    await registrationPage.enterPassword(customer.password);
    await registrationPage.acceptTermsAndConditions();

    await expect(registrationPage.createAccountButton).toBeEnabled();

    await registrationPage.createAccount();

    await expect(registrationPage.confirmEmailMessage).toBeVisible();
  });

  // =========================================================
  // Required Field Validation
  // =========================================================

  test.describe('Required Field Validation', () => {
    test('Create Account button should remain disabled when required fields are incomplete', async ({
      loginPage,
    }) => {
      const registrationPage = await loginPage.openCustomerRegistration();

      const customer = createCustomerData();

      // First Name
      await registrationPage.enterFirstName(customer.firstName);

      await expect(registrationPage.createAccountButton).toBeDisabled();

      // Last Name
      await registrationPage.enterLastName(customer.lastName);

      await expect(registrationPage.createAccountButton).toBeDisabled();

      // Company
      await registrationPage.enterCompanyAndLegalForm(customer.companyName);

      await expect(registrationPage.createAccountButton).toBeDisabled();

      // Email
      await registrationPage.enterNewEmail(customer.email);

      await expect(registrationPage.createAccountButton).toBeDisabled();

      // Password
      await registrationPage.enterPassword(customer.password);

      // Terms are not accepted yet
      await expect(registrationPage.createAccountButton).toBeDisabled();
    });

    test('Create Account button should be enabled when all required fields are valid', async ({
      loginPage,
    }) => {
      const registrationPage = await loginPage.openCustomerRegistration();

      const customer = createCustomerData();

      await registrationPage.enterFirstName(customer.firstName);
      await registrationPage.enterLastName(customer.lastName);
      await registrationPage.enterCompanyAndLegalForm(customer.companyName);
      await registrationPage.enterNewEmail(customer.email);
      await registrationPage.enterPassword(customer.password);
      await registrationPage.acceptTermsAndConditions();

      await expect(registrationPage.createAccountButton).toBeEnabled();
    });
  });

  // =========================================================
  // Email Validation
  // =========================================================

  test.describe('Email Validation', () => {
    for (const email of invalidEmails) {
      test(`Registration form should show validation error for invalid email: ${email}`, async ({ loginPage }) => {
        const registrationPage = await loginPage.openCustomerRegistration();

        const customer = createCustomerData();

        await registrationPage.enterFirstName(customer.firstName);
        await registrationPage.enterLastName(customer.lastName);
        await registrationPage.enterCompanyAndLegalForm(customer.companyName);
        await registrationPage.enterNewEmail(email);
        await registrationPage.enterPassword(customer.password);
        await registrationPage.acceptTermsAndConditions();

        await expect(registrationPage.createAccountButton).toBeEnabled();

        await registrationPage.createAccount();

        await expect(registrationPage.emailError).toHaveText(emailValidationError);
      });
    }

    test('Registration form should allow registration after correcting invalid email', async ({ loginPage }) => {
      const registrationPage = await loginPage.openCustomerRegistration();

      const customer = createCustomerData();

      await registrationPage.enterFirstName(customer.firstName);
      await registrationPage.enterLastName(customer.lastName);
      await registrationPage.enterCompanyAndLegalForm(customer.companyName);
      await registrationPage.enterNewEmail('invalid-email');
      await registrationPage.enterPassword(customer.password);
      await registrationPage.acceptTermsAndConditions();

      await registrationPage.createAccount();

      await expect(registrationPage.emailError).toBeVisible();

      await registrationPage.enterNewEmail(customer.email);

      await registrationPage.createAccount();

      await expect(registrationPage.emailError).toHaveText(emailValidationError);
    });
  });

  // =========================================================
  // Password Validation
  // =========================================================

  test.describe('Password Validation', () => {
    for (const password of invalidPasswords) {
      test(`Registration form should show validation error for invalid password: ${password}`, async ({
        loginPage,
      }) => {
        const registrationPage = await loginPage.openCustomerRegistration();

        const customer = createCustomerData();

        await registrationPage.enterFirstName(customer.firstName);
        await registrationPage.enterLastName(customer.lastName);
        await registrationPage.enterCompanyAndLegalForm(customer.companyName);
        await registrationPage.enterNewEmail(customer.email);
        await registrationPage.enterPassword(password);
        await registrationPage.acceptTermsAndConditions();

        await expect(registrationPage.createAccountButton).toBeEnabled();

        await registrationPage.createAccount();

        await expect(registrationPage.passwordError).toHaveText(passwordValidationError);
      });
    }
  });

  // =========================================================
  // Terms & Conditions
  // =========================================================

  test.describe('Terms and Conditions', () => {
    test('Create Account button should remain disabled when Terms and Conditions are not accepted', async ({
      loginPage,
    }) => {
      const registrationPage = await loginPage.openCustomerRegistration();

      const customer = createCustomerData();

      await registrationPage.enterFirstName(customer.firstName);
      await registrationPage.enterLastName(customer.lastName);
      await registrationPage.enterCompanyAndLegalForm(customer.companyName);
      await registrationPage.enterNewEmail(customer.email);
      await registrationPage.enterPassword(customer.password);

      // Terms are intentionally not accepted
      await expect(registrationPage.createAccountButton).toBeDisabled();
    });

    test('Create Account button should become enabled after accepting Terms and Conditions', async ({
      loginPage,
    }) => {
      const registrationPage = await loginPage.openCustomerRegistration();

      const customer = createCustomerData();

      await registrationPage.enterFirstName(customer.firstName);
      await registrationPage.enterLastName(customer.lastName);
      await registrationPage.enterCompanyAndLegalForm(customer.companyName);
      await registrationPage.enterNewEmail(customer.email);
      await registrationPage.enterPassword(customer.password);

      await expect(registrationPage.createAccountButton).toBeDisabled();

      await registrationPage.acceptTermsAndConditions();

      await expect(registrationPage.createAccountButton).toBeEnabled();
    });
  });
});
