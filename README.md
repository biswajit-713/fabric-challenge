# Fabric QA Code Challenge — OrangeHRM Test Automation

- Automate employee creation and update on https://opensource-demo.orangehrmlive.com
- validate the employee details through api

## Prerequisites
- Node.js 24+
- npm

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

## How the tests are structured
### 1. UI and API tests are as separate projects
UI and API tests are different by nature. Hence those are separated to different specs and projects, so that a specific suite can be run on demand.
The api project depends on the ui project as it validates the employee information created by ui project

### 2. login and logout as part of beforeAll test hook
There were 3 options evaluated. Here are the reasoning.

#### 1. login and logout in `beforEach` and `afterEach`
##### Pros
- Each test starts clean and no dependency on other test. This is practiced in most standard test suites.
##### Cons
- The test execution time increases due to login/ logout in each test (3x for 3 tests)
- The application under test (OrangeHRM demo site) is slow and does not load within a timeout of 60s more often. Hence the tests would fail most of the times.

#### 2. Authenticate once in the setup , save the authentication state, and reuse it to bootstrap each test already authenticated
##### Pros
- It does not require to perform the login via ui everytime. Recommended approach for tests without server-side state.
##### Cons
- The setup needs to run explicitly from time to time, whenever existing authentication expires. The timeout is short in OrangeHRM demo site.
- It was observed that the application launch timed out similar to the issue mentioned in the previous reasoning.

#### 3. login/logout in `beforeAll` and `afterAll` (chosen approach)
##### Pros
- One time login and logout for a test spec. No overhead of login/logout for each test; thereby reducing the chances of timeout failure
- Tests execute faster than other approaches
##### Cons
- It is not a recommended practic in most of the test suites as the side effect of one test may trickle down to the next test in execution pipeline
- It requires careful orchestration or state clean up in `beforeEach` to ensure each test gets a clean state to begin

#### 3. dynamic employee id injection through environment variable
As the UI and API tests are separate, the employee created in UI test is needed to be passed to the API test so that it can validate the same employee id. Also the employee id can't be kept constant in the fixture `data/testdata.json` as duplicate employee id is not allowed; though OrangeHRM clears the records after sometime. 
Hence a dynamic employee id is created in `global-setup.js` and set as an environment variable in main process. Each worker thread inherits the environment, hence the env variable is available to every test. 

#### 4. page objects wrapped under module
The PIM module is a logical abstraction of People Information Management that includes functions - employee creation, listing and updating employee. If the tests deal with each of the pages directly through page object for each page, the tests would not reflect the relation between the functions. Hence those functions are composed under a logical abstraction of `PIM` module.

#### 5. api authentication through Bearer Token
The bearer token to execute api tests was found online through search and a fixed value is used for testing. In real applications, those would be fetched by first providing authentication through credentials such as client id/ client secret.

# Disclaimer
Both the code challenge and case study have been prepared with AI assitance to explore various approaches and discovering all facets of a choice. The AI assistance was introduced only after initial framing of the solution statement. I own 100% of the choices adopted in both the problem statements.