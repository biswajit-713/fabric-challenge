import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

import { admin } from '../../data/employee.json';
import { DashboardPage } from '../../pages/dashboard.page';

test.describe('Employee lifecycle - PIM module', () => {
    test('should create a new employee and update its infomation', async ( { page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);
        
        await loginPage.goto();
        await loginPage.login(admin.username, admin.password);

        await dashboardPage.logout();
    });
});