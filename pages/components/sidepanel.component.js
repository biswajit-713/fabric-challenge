import { expect } from "@playwright/test";

export class LeftNavigationMenu {
    constructor(page) {
        this.page = page;
    }

    async assertIsFunctional() {
        await expect(this.page.getByRole('navigation', {name: 'Sidepanel'})).toBeVisible();

        const searchBox = this.page.getByRole('textbox', { name: 'Search' });
        await expect(searchBox).toBeEditable();

        await searchBox.fill('PIM');

        const nav = this.page.getByRole('navigation', { name: 'Sidepanel' });
        await expect(nav.getByRole('link', { name: 'PIM' })).toBeVisible();
        await expect(nav.getByRole('link', { name: 'Admin' })).not.toBeVisible();
        await expect(nav.getByRole('link', { name: 'Leave' })).not.toBeVisible();

        await searchBox.clear();
    }
}