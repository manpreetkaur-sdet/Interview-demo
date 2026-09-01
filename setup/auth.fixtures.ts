import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  loginPage: LoginPage;
  acceptCookies: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  acceptCookies: async ({ page }, use) => {
    const acceptButton = page.getByRole('button', {
      name: 'Accept everything',
    });

    const acceptCookies = async () => {
      try {
        await expect(acceptButton).toBeVisible({});

        await acceptButton.click();
      } catch {
        // Cookie banner is not present.
      }
    };

    await use(acceptCookies);
  },
});

export { expect };