import { test } from "../fixtures";
import { LoginPage } from "../../pages/login.page";
import { admin } from "../../data/testdata.json";
import { DashboardPage } from "../../pages/dashboard.page";
import { PimModule } from "../../modules/pim.module";

test.describe.serial("Employee lifecycle Create and update - PIM module", () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(admin.username, admin.password);

  });

  test.afterEach(async () => {
    await dashboardPage.logout();
    await loginPage.assertOnPage();
  });

  test("should show a functional left navigation menu", async () => {
    await dashboardPage.assertLeftNavigation();
  });

  test("should create a new employee", async ({ page, newEmployee }) => {
    await dashboardPage.navigateTo("PIM");
    
    const pim = new PimModule(page);
    await pim.addEmployee(newEmployee);
    
    await pim.assertEmployeeCreated(newEmployee);
  });

  test("should update employee information", async ({ page, newEmployee }) => {
    await dashboardPage.navigateTo("PIM");

    const pim = new PimModule(page);
    await pim.updateEmployeeInfo(newEmployee);

    await pim.assertEmployeeUpdated(newEmployee);
  });
});
