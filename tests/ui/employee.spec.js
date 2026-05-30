import { test } from "../fixtures";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { PimModule } from "../../modules/pim.module";
import { admin } from "../../data/testdata.json";

// Manually-created contexts don't inherit baseURL from playwright.config.js
const BASE_URL = "https://opensource-demo.orangehrmlive.com";

test.describe.serial("Employee lifecycle Create and update - PIM module", () => {
  let authState;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({ baseURL: BASE_URL });
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(admin.username, admin.password);
    authState = await context.storageState();
    await context.close();
  });

  test.afterAll(async ({ browser }) => {
    const context = await browser.newContext({ baseURL: BASE_URL, storageState: authState });
    const page = await context.newPage();
    await page.goto("/web/index.php/dashboard/index");
    await new DashboardPage(page).logout();
    await new LoginPage(page).assertOnPage();
    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    await page.context().addCookies(authState.cookies ?? []);
    await page.goto("/web/index.php/dashboard/index");
  });

  test("should show a functional left navigation menu", async ({ page }) => {
    await new DashboardPage(page).assertLeftNavigation();
  });

  test("should create a new employee", async ({ page, newEmployee }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo("PIM");

    const pim = new PimModule(page);
    await pim.addEmployee(newEmployee);
    await pim.assertEmployeeCreated(newEmployee);
  });

  test("should update employee information", async ({ page, newEmployee }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateTo("PIM");

    const pim = new PimModule(page);
    await pim.updateEmployeeInfo(newEmployee);
    await pim.assertEmployeeUpdated(newEmployee);
  });
});
