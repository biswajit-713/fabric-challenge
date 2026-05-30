export class AddEmployeePage {
    constructor(page) {
        this.page = page;
    }

    async add(employee) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastName);
        
        const idField = this.page.locator('div').filter({ hasText: /^Employee Id$/ }).getByRole('textbox');
        const employeeId = await idField.inputValue();

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForURL(/viewPersonalDetails/);
        await this.page.waitForLoadState('networkidle');

        return employeeId;
    }
}