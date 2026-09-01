import { test } from '../../setup/auth.fixtures';

test.describe('SSO Login', () => {
  test.skip('user can initiate SSO login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginBySSO(process.env.SSO_EMAIL!);
  });
});
