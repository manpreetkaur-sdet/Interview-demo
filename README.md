# Rapiduser test Automation

## Project Description

This project is an end-to-end test automation framework built using **Playwright and TypeScript**.

The automation covers the following application flows:

- Customer Registration
- Standard Customer Login
- SSO Login

### Customer Registration Coverage

The customer registration tests cover:

- Successful customer registration
- Required field validation
- Create Account button state validation
- Invalid email validation
- Invalid password validation
- Terms & Conditions validation
- Recovery after correcting an invalid email
- English and German validation messages

Tester registration is intentionally not automated because it is outside the requested scope.

Email verification through the confirmation link is also not automated because it is explicitly out of scope.

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

---

## Project Structure

```text
.
├── api/
├── config/
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   └── RegistrationPage.ts
│
├── setup/
│   └── auth.fixtures.ts
│
├── test-data/
│   └── customer.data.ts
│
├── tests/
│   ├── authentication/
│   │   ├── login.spec.ts
│   │   └── sso-login.spec.ts
│   │
│   └── registration/
│       └── customer-registration.spec.ts
│
├── utils/
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
````

## Folder Description

### `pages/`

Contains Page Object classes.

* `LoginPage.ts` contains login page locators and actions.
* `HomePage.ts` contains customer home page locators and validations.
* `RegistrationPage.ts` contains customer registration locators, actions, and validation elements.

The Page Object Model keeps UI interaction separate from test logic and makes the tests easier to maintain.

### `tests/`

Contains Playwright test specifications.

Tests are grouped by application functionality:

* `authentication/` contains standard login and SSO tests.
* `registration/` contains customer registration tests.

### `test-data/`

Contains reusable test data.

The customer data file contains:

* Valid customer data
* Invalid email values
* Invalid password values
* Expected email validation messages
* Expected password validation messages

This keeps test data separate from test implementation.

Invalid email and password scenarios use data-driven testing so multiple validation scenarios can be executed without duplicating test logic.

### `setup/`

Contains custom Playwright fixtures.

The authentication fixture provides reusable Page Object instances to the tests and centralizes common test setup.

This allows tests to directly use objects such as the Login Page without repeatedly creating Page Object instances.

### `api/`

Contains API-related functionality and helpers.(It will be used in future)

### `utils/`

Contains reusable utility functions that can be shared across tests. (It will be used in future)

### `config/`

Contains additional configuration-related files. (It will be used in future)

### `playwright.config.ts`

Contains the main Playwright configuration, including:

* Test directory
* Base URL
* Basic Authentication
* Assertion timeout
* Browser projects
* Parallel execution
* Screenshots
* Videos
* Traces
* HTML reporting

---

## Test Architecture

The framework follows the **Page Object Model (POM)** approach.

The responsibilities are separated into:

**Test Specifications → Page Objects → Application**

Test specifications contain the test scenarios and assertions.

Page Objects contain locators and page-level actions.

Test data is maintained separately from the test implementation.

Custom fixtures provide reusable Page Objects and common test setup.

This separation improves readability, reusability, and maintainability.

---

## Test Data

Test data is maintained in the `test-data` folder.

Valid customer information is generated using reusable test-data functionality.

Invalid email and password values are maintained separately and used for data-driven validation tests.

This approach makes it easy to add new validation scenarios without duplicating test code.

Validation messages are also maintained as test data.

The application supports English and German, so the validation assertions support both localized messages.

---

## Parallel Execution

The test suite is configured to support parallel execution.

Playwright's parallel execution allows independent tests to run concurrently using multiple workers.

This reduces the overall execution time of the regression suite.

Tests are designed to be independent and should not rely on the execution order of other tests.

### Run tests in parallel

Run the complete suite using multiple workers:

```bash
npx playwright test --workers=4
```

Run Chromium tests using four workers:

```bash
npx playwright test --project=chromium --workers=4
```

The number of workers can be adjusted depending on the environment.

---

## Run Tests Without Parallel Execution

For sequential execution, use a single worker:

```bash
npx playwright test --workers=1
```

For example:

```bash
npx playwright test --project=chromium --workers=1
```

Sequential execution is useful when:

* Debugging test failures
* Investigating intermittent failures
* Troubleshooting environment issues
* Checking whether a problem is related to concurrent execution

---

## Running Tests in Headless Mode

Playwright runs tests in headless mode by default.

In headless mode, the browser runs without displaying the browser window.

This mode is useful for:

* Regression testing
* CI/CD execution
* Faster automated execution
* Remote test environments

## Run all tests in headless mode

```bash
npx playwright test
```

## Run Chromium in headless mode

```bash
npx playwright test --project=chromium
```

---

# Running Tests in a Browser

Tests can be executed in headed mode when you want to see the browser during execution.

## Run tests with the browser visible

```bash
npx playwright test --headed
```

## Run Chromium with the browser visible

```bash
npx playwright test --project=chromium --headed
```

Headed mode is useful for:

* Debugging
* Developing new tests
* Demonstrating the automation
* Investigating UI behavior

---

# Running Tests in Debug Mode

Playwright debug mode can be used to investigate test failures step by step.

```bash
npx playwright test --debug
```

For a specific test file:

```bash
npx playwright test tests/registration/customer-registration.spec.ts --debug
```

Debug mode opens Playwright Inspector and allows the test execution to be inspected interactively.

---

# Running Tests Using UI Mode

Playwright UI Mode provides an interactive interface for selecting and running individual tests.

```bash
npx playwright test --ui
```

UI Mode is useful for:

* Selecting individual tests
* Running tests repeatedly
* Debugging tests
* Viewing test results

---

# Running Specific Test Suites

## Run Customer Registration

```bash
npx playwright test tests/registration/customer-registration.spec.ts
```

## Run Authentication Tests

```bash
npx playwright test tests/authentication
```

## Run SSO Login

```bash
npx playwright test tests/authentication/sso-login.spec.ts
```

---

# Running a Specific Test

A specific test can be selected using the test name.

For example:

```bash
npx playwright test --grep "Customer can successfully register"
```

This is useful when debugging a particular scenario instead of running the entire test suite.

---

# Browser Coverage

The project is configured to support:

* Chromium
* Firefox
* WebKit

## Chromium

```bash
npx playwright test --project=chromium
```

## Firefox

```bash
npx playwright test --project=firefox
```

## WebKit

```bash
npx playwright test --project=webkit
```

---

# Playwright HTML Report

The project uses the Playwright HTML reporter.

After running the tests, the HTML report can be opened using:

```bash
npx playwright show-report
```

The report provides:

* Passed tests
* Failed tests
* Skipped tests
* Test duration
* Browser/project information
* Error details
* Screenshots
* Videos
* Trace information when available

The project is configured to capture additional failure information to help investigate failed tests.

---

# Failure Artifacts

The Playwright configuration collects additional information when tests fail.

### Screenshots

Screenshots are captured when a test fails.

### Videos

Videos are retained for failed tests.

### Traces

Traces are collected on the first retry.

These artifacts make it easier to investigate UI failures, timing issues, and unexpected application behavior.

---

# SSO Test Limitation

The SSO positive flow has been included in the authentication test structure but is currently skipped.

A valid external SSO test user/account was not available for this assignment.

Because of this limitation, the complete SSO flow could not be executed against the external identity provider.

The intended approach is to enable the SSO test once a dedicated SSO test account and the required external authentication access are available.

No external SSO credentials have been hardcoded into the project.

---

# Out of Scope

The following scenarios are intentionally excluded:

* Tester registration
* Email verification through the confirmation link

These are outside the requested assignment scope.


# Environment Configuration

Environment-specific configuration is stored in the `.env` file.

The project uses environment variables for the application URL and Basic Authentication credentials.

Sensitive credentials are not hardcoded in the test cases and should not be committed to the repository.

An `.env.example` file is provided as a template for the required environment variables.

---

# Quick Command Reference

| Purpose              | Command                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| Run all tests        | `npx playwright test`                                                  |
| Run Chromium         | `npx playwright test --project=chromium`                               |
| Run Firefox          | `npx playwright test --project=firefox`                                |
| Run WebKit           | `npx playwright test --project=webkit`                                 |
| Run headed           | `npx playwright test --headed`                                         |
| Run parallel         | `npx playwright test --workers=4`                                      |
| Run sequential       | `npx playwright test --workers=1`                                      |
| Debug                | `npx playwright test --debug`                                          |
| UI Mode              | `npx playwright test --ui`                                             |
| Registration tests   | `npx playwright test tests/registration/customer-registration.spec.ts` |
| Authentication tests | `npx playwright test tests/authentication`                             |
| Open report          | `npx playwright show-report`                                           |

---

Code Quality

The project uses ESLint and Prettier to maintain code quality, consistency, and readable formatting across the automation framework.

ESLint

ESLint is used to identify potential JavaScript/TypeScript code-quality issues, such as unused variables and other common problems.

Run ESLint

npx eslint .

Automatically fix ESLint issues

npx eslint . --fix

The ESLint configuration is maintained in eslint.config.mjs.

Prettier

Prettier is used to keep the project code consistently formatted.

Check formatting

npx prettier . --check

This checks the project for formatting issues without changing any files.

Format the project

npx prettier . --write

This automatically formats the project files.

The Prettier configuration is maintained in .prettierrc.

Recommended Code Quality Check

Before committing or submitting the project, run:

npx prettier . --check
npx eslint .

If formatting changes are required, run:

npx prettier . --write

Then run ESLint again to confirm there are no linting issues.

---

# Future Improvements

If additional environment access and time were available, the following improvements could be made:

* Enable and execute the SSO test using a dedicated external SSO account
* Add API-level validation where appropriate
* Add CI/CD pipeline integration
* Expand cross-browser regression execution
* Add additional edge-case validation scenarios
* Improve reusable test helpers as the automation suite grows
* Will user playwrigh cli if required
* Will user custom AI Agent if required to use copilot
* Will use AI Agents to create manual and automation test cases

---

# Summary

This project uses Playwright with TypeScript and follows a maintainable automation architecture based on:

* Page Object Model
* Custom Playwright fixtures
* Centralized test data
* Data-driven testing
* Independent tests for parallel execution
* Multi-browser support
* Headless and headed execution
* Debugging support
* HTML reporting
* Failure screenshots, videos, and traces

````

### The commands I'd definitely demonstrate in the interview

If they ask you to show the framework, these four are enough:

```text
Normal/headless:
npx playwright test

Browser visible:
npx playwright test --headed

Parallel:
npx playwright test --workers=4

Sequential:
npx playwright test --workers=1
````

And then:

```text
Report:
npx playwright show-report
```

That gives you a very clean story: **how you run it normally, how you debug it, how you run it in parallel, how you run it sequentially, and how you inspect the results.**
