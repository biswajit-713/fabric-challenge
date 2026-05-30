import { expect } from "@playwright/test";

export class EmployeeListPage {
    constructor(page) {
        this.page = page;
    }

    async launchAddEmployee() {
        await expect(this.page.getByText('Employee InformationEmployee')).toBeVisible();
        await this.page.getByRole('listitem').filter({ hasText: 'Add Employee' }).click();
    }
    
    async assertEmployeeCreated(employee) {

        await this.#showEmployeeList();

        await this.#searchById(employee.id);
        await expect(this.page.locator('.orangehrm-employee-list')).toBeEnabled();

        await expect(this.page.locator('div').filter({ hasText: /Record Found$/ }).first()).toHaveText('(1) Record Found');
        await expect(this.page.locator('.oxd-table-card')).toHaveCount(1);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(1)).toHaveText(String(employee.id));
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(2)).toHaveText(employee.firstName);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(3)).toHaveText(employee.lastName);
    }

    async assertEmployeeUpdated(employee) {
        await this.#showEmployeeList();

        await this.#searchById(employee.id);
        
        await expect(this.page.locator('div').filter({ hasText: /Record Found$/ }).first()).toHaveText('(1) Record Found');
        await expect(this.page.locator('.oxd-table-card')).toHaveCount(1);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(1)).toHaveText(String(employee.id));
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(2)).toHaveText(employee.firstName + " " + employee.personalInfo.middleName);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(3)).toHaveText(employee.lastName);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(4)).toHaveText(employee.jobDetails.jobTitle);

    }

    async navigateToEmployeeDetails(employee) {
        await this.#searchById(employee.id);
        await this.page.locator('.oxd-table-card').click();
        await this.page.waitForURL(/viewPersonalDetails/);
    }

    async #searchById(id) {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('div').filter({ hasText: /^Employee Id$/ }).getByRole('textbox').fill(String(id));
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.locator('div').filter({ hasText: /Record Found$/ }).first().waitFor();
    }

    async #showEmployeeList() {
        await this.page.getByRole('link', { name: 'Employee List' }).click();
        await expect(this.page.locator('.orangehrm-employee-list')).toBeEnabled();
    }

}