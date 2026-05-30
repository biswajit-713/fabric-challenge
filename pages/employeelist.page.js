import { expect } from "@playwright/test";

export class EmployeeListPage {
    constructor(page) {
        this.page = page;
    }

    async launchAddEmployee() {
        await expect(this.page.getByText('Employee InformationEmployee')).toBeVisible();
        await this.page.getByRole('listitem').filter({ hasText: 'Add Employee' }).click();
    }
}