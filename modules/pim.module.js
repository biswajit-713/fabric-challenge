import { EmployeeListPage } from "../pages/employeelist.page";
import { AddEmployeePage } from "../pages/addemployee.page";
import { expect } from "@playwright/test";

export class PersonalInformationManagement {
    constructor(page) {
        this.page = page;
        this.employeeListPage = new EmployeeListPage(page);
        this.addEmployeePage = new AddEmployeePage(page);
    }

    async addEmployee(employee) {
        await this.employeeListPage.launchAddEmployee();
        return await this.addEmployeePage.add(employee);
    }

    async assertNewEmployee(employee) {
        await this.page.getByRole('link', { name: 'Employee List' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('div').filter({ hasText: /^Employee Id$/ }).getByRole('textbox').fill(employee.id);
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.waitForLoadState('networkidle');

        await expect(this.page.locator('div').filter({ hasText: /Record Found$/ }).first()).toHaveText('(1) Record Found');
        await expect(this.page.locator('.oxd-table-card')).toHaveCount(1);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(1)).toHaveText(employee.id);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(2)).toHaveText(employee.firstName);
        await expect(this.page.locator('.oxd-table-card').getByRole('cell').nth(3)).toHaveText(employee.lastName);
    }
}