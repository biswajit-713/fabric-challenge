import { test } from "../fixtures";
import { LoginPage } from "../../pages/login.page";
import { DashboardPage } from "../../pages/dashboard.page";
import { PimModule } from "../../modules/pim.module";
import { admin } from "../../data/testdata.json";

const BASE_URL = "https://opensource-demo.orangehrmlive.com";

test.describe.serial("Employee lifecycle Create and update - PIM module", () => {
  let sharedPage;
  let sharedContext;

  test.beforeAll(async ({ browser }) => {
    sharedContext = await browser.newContext({ baseURL: BASE_URL });
    sharedPage = await sharedContext.newPage();
    await new LoginPage(sharedPage).goto();
    await new LoginPage(sharedPage).login(admin.username, admin.password);
  });

  test.afterAll(async () => {
    await new DashboardPage(sharedPage).logout();
    await new LoginPage(sharedPage).assertOnPage();
    await sharedContext.close();
  });

  test.beforeEach(async () => {
    await sharedPage.goto("/web/index.php/dashboard/index");
  });

  test("should show a functional left navigation menu", async () => {
    await new DashboardPage(sharedPage).assertLeftNavigation();
  });

  test("should create a new employee", async ({ newEmployee }) => {
    await new DashboardPage(sharedPage).navigateTo("PIM");
    const pim = new PimModule(sharedPage);
    await pim.addEmployee(newEmployee);
    await pim.assertEmployeeCreated(newEmployee);
  });

  test("should update employee information", async ({ newEmployee }) => {
    await new DashboardPage(sharedPage).navigateTo("PIM");
    const pim = new PimModule(sharedPage);
    await pim.updateEmployeeInfo(newEmployee);
    await pim.assertEmployeeUpdated(newEmployee);
  });
});
