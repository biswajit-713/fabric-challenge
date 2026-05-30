import { TopMenuComponent } from './components/topmenu.component';
import { LeftNavigationMenu } from './components/sidepanel.component';

export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.topmenu = new TopMenuComponent(page);
        this.leftNavigationMenu = new LeftNavigationMenu(page);
    }

    async logout() {
        await this.topmenu.logout();
    }

    async assertLeftNavigation() {
        await this.leftNavigationMenu.assertIsFunctional();
    }

    async navigateTo(hcmModule) {
        await this.leftNavigationMenu.launchModule(hcmModule);
    }
}