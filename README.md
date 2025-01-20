# Funda Website Test Automation

This project contains automated end-to-end tests for the Funda website (www.funda.nl) using Playwright with JavaScript.

## Features

- Page Object Model (POM) design pattern
- Reusable authentication state
- Custom commands and assertions
- Data-driven testing
- Network request mocking
- Google Chrome browser support

## Prerequisites

- Node.js (v16 or higher)
- NPM (Node Package Manager)
- Google Chrome browser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/debasispal2007/funda-playwright-tests.git
cd funda-playwright-tests
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chrome
```

## Project Structure

```
funda-playwright-tests/
├── pages/
│   ├── LoginPage.js
│   ├── MapSearchPage.js
│   ├── ListViewPage.js
│   └── NetworkMockPage.js
├── tests/
│   ├── login.spec.js
│   ├── map-search.spec.js
│   ├── list-view.spec.js
│   └── network-mock.spec.js
├── utils/
│   ├── test-data.js
│   ├── map-search-data.js
│   ├── filter-data.js
│   └── mock-data.js
├── playwright.config.js
└── package.json
```

## Running Tests

**Important Note**: Tests must be run sequentially in a specific order due to authentication state reuse and CAPTCHA challenges.

### Test Sequence:

1. First, run the login test:
```bash
npx playwright test login.spec.js --headed
```

2. After successful login, run the map search tests:
```bash
npx playwright test map-search.spec.js
```
When prompted by the CAPTCHA challenge, solve it manually. The test will wait for your intervention.

**Imp Note:**
The Test is supposed to fail as the requirement is not correct the map cannot zoom and select a list of properties.

3. Then run the list view tests:
```bash
npx playwright test list-view.spec.js
```

4. Finally, run the network mock tests:
```bash
npx playwright test network-mock.spec.js
```

### Running All Tests: (Not recommended for this particular project)
To run all tests in sequence:
```bash
npm test
```

## Test Coverage

1. **Login Test**
   - Handles cookie consent
   - Manages CAPTCHA challenge
   - Saves authentication state

2. **Map Search Test**
   - Searches by coordinates
   - Searches by location
   - Searches by postcode
   - Uses stored authentication

3. **List View Test**
   - Applies price filters
   - Applies living area filters
   - Sets keyword filters
   - Verifies search results

4. **Network Mock Test**
   - Intercepts network requests
   - Mocks listing data
   - Verifies mocked content

## Known Limitations

1. **CAPTCHA Requirement**
   - The login test requires manual CAPTCHA resolution
   - A 2-minute timeout is provided for manual intervention

2. **Sequential Execution**
   - Tests must be run in sequence
   - Authentication state is shared between tests

3. **Browser Support**
   - Currently only supports Google Chrome
   - Headed mode required for CAPTCHA resolution

## Reporting

Test reports are generated in HTML format and can be found in:
```
playwright-report/index.html
```

To view the report:
```bash
npx playwright show-report
```
