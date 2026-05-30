import { TopMenuComponent } from './components/topmenu.component';
import { LeftNavigationMenu } from './components/sidepanel.component';
import { timeout } from '../playwright.config';

export class DashboardPage {
    constructor(page) {
        this.topmenu = new TopMenuComponent(page);
        this.leftNavigationMenu = new LeftNavigationMenu(page); 
    }

    async logout() {
        await this.topmenu.logout();
    }

    async assertLeftNavigationFunctional() {
        await this.leftNavigationMenu.assertIsFunctional();
    }
}