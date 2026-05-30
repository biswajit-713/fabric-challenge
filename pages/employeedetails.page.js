import { expect } from "@playwright/test";

export class EmployeeDetailsPage {
    constructor(page) {
        this.page = page;
    }

    async updatePersonalInfo(info) {
        await this.page.getByRole('link', { name: 'Personal Details' }).click();
        await expect(this.page.getByText('Employee Full Name')).toBeVisible();

        await this.page.getByText(info.gender, { exact: true }).click()
        await this.page.getByRole('textbox', { name: 'Middle Name' }).fill(info.middleName);

        await this.page.locator('form').filter({ hasText: /Employee Full Name/ }).getByRole('button').click();
        await expect(this.page.locator('form').filter({ hasText: /Employee Full Name/ }).getByRole('button')).toBeVisible();

    }

    async updateJob(jobDetails) {
        await this.page.getByRole('link', { name: 'Job' }).click();
        await this.page.waitForURL(/viewJobDetails/);

        await this.page.locator('.oxd-grid-item').filter({ hasText: /^Job Title/ }).locator('.oxd-select-text').click();
        await this.page.getByRole('option', {name: jobDetails.jobTitle}).click();

        await this.page.getByRole('button', { name: 'Save' }).click();
        await expect(await this.page.getByRole('button', { name: 'Save' })).toBeEnabled(); 

    }
}