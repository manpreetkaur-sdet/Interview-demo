import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly createNewTestButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.createNewTestButton = page.getByTestId('customer-create-new-test-button');
  }

  async assertHomePageLoaded() {
    await expect(this.page).toHaveURL(/\/customer\/home/);
  }
}
