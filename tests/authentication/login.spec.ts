import { test } from '../../setup/auth.fixtures';

test('should access application with basic authentication', async ({ page }) => {
  await page.goto('/login');
});
test('customer can login successfully', async ({ loginPage, acceptCookies }) => {
  await loginPage.goto();
  const homePage = await loginPage.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  await acceptCookies();
  await homePage.assertHomePageLoaded();
});
