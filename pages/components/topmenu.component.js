export class TopMenuComponent {
    constructor(page) {
        this.page = page;
    }

    async logout() {
        await this.page.locator('.oxd-userdropdown-tab').click();
        await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    }
}