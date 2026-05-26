import { test, expect } from '@playwright/test';

import { admin } from '../../data/employee.json';

test.describe('Employee lifecycle - PIM module', () => {
    test('should create a new employee and update its infomation', async ( { page }) => {
        await page.goto('/');
        
        await page.getByRole('textbox', { name: 'Username' }).fill(admin.username);
        await page.getByRole('textbox', { name: 'Password' }).fill(admin.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForURL('**/dashboard/index');

        await page.locator('.oxd-userdropdown-tab').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
    });
});