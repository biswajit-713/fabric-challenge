# Fabric QA Code Challenge — OrangeHRM Test Automation

Playwright-based test automation framework covering UI and API scenarios against the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com).

## Prerequisites

- Node.js 24+
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (UI then API) |
| `npm run test:ui` | Run UI tests only |
| `npm run test:api` | Run API tests (depends on UI project) |

## Configuration

- Base URL: `https://opensource-demo.orangehrmlive.com`
- Test credentials and employee data: `data/testdata.json`

## CI

Set `CI=true` to enable 2 retries per failing test:

```bash
CI=true npm test
```
