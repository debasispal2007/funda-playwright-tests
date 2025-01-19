const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const TestBase = require('../utils/test-base');
const { credentials } = require('../utils/test-data');

test.describe('Login Tests', () => {
    let testBase;
    let loginPage;

    test.beforeAll(async () => {
        testBase = new TestBase();
        await testBase.setupBrowser();
        loginPage = testBase.loginPage;
    });

    test.afterAll(async () => {
        await testBase.closeBrowser();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.navigateToLogin();
        await loginPage.login(credentials.email, credentials.password);
        
        // Assert successful login
        const isLoggedIn = await loginPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
        
        // Save authentication state for future tests
        await testBase.saveStorageState();
    });
});