import { TopMenuComponent } from './components/topmenu.component';

export class DashboardPage {
    constructor(page) {
        this.topmenu = new TopMenuComponent(page);
    }

    async logout() {
        await this.topmenu.logout();
    }
}