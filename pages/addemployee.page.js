export class AddEmployeePage {
    constructor(page) {
        this.page = page;
    }

    async add(employee) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(employee.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(employee.lastName);
        await this.page.locator('div').filter({ hasText: /^Employee Id$/ }).getByRole('textbox').fill(String(employee.id));

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForURL(/viewPersonalDetails/);
    }
}