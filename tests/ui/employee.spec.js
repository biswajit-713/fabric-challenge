import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

import { admin } from '../../data/employee.json';
import { DashboardPage } from '../../pages/dashboard.page';
import { PersonalInformationManagement } from '../../modules/pim.module';

test.describe('Employee lifecycle - PIM module', () => {
    test('should create a new employee and update its infomation', async ( { page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        const pim = new PersonalInformationManagement(page);
        
        // login
        await loginPage.goto();
        await loginPage.login(admin.username, admin.password);

        // assert left menu is functional
        await dashboardPage.assertLeftNavigationFunctional();

        // navigate to PIM module
        await page.getByRole('link', { name: 'PIM' }).click();

        // add employee
        const employee = {'firstName': 'dimple', lastName: 'chin'};
        const employeeId = await pim.addEmployee(employee);
        await pim.assertNewEmployee({...employee, id: employeeId});

        // logout
        await dashboardPage.logout();
        await expect(loginPage.page).toHaveURL(/login/);
        await expect(loginPage.usernameInput).toBeVisible();
    });
});