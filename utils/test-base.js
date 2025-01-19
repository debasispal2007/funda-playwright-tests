const { chromium } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

class TestBase {
    async setupBrowser() {
        this.browser = await chromium.launch({
            headless: false // Set to true for headless mode
        });
        this.context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 }
        });
        this.page = await this.context.newPage();
        this.loginPage = new LoginPage(this.page);
    }

    async saveStorageState() {
        await this.context.storageState({ path: 'state.json' });
    }

    async closeBrowser() {
        await this.browser.close();
    }
}

module.exports = TestBase;