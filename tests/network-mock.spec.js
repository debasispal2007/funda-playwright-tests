// tests/network-mock.spec.js
const { test, expect } = require('@playwright/test');
const NetworkMockPage = require('../pages/NetworkMockPage');

test.describe('Network Mock Tests', () => {
    let networkMockPage;

    test.beforeEach(async ({ browser }) => {
        // Create new context with saved authentication
        const context = await browser.newContext({
            storageState: './state.json'
        });
        
        const page = await context.newPage();
        networkMockPage = new NetworkMockPage(page);
    });

    test('should mock listing data with intercepted network request', async () => {
        // Setup network interception before navigation
        await networkMockPage.setupNetworkInterception();
        
        // Navigate to a listing
        await networkMockPage.navigateToListing();
        
        // Get the mocked listing details
        const listingContent = await networkMockPage.getListingDetails();
        
        // Verify mocked data is displayed
        expect(listingContent).toContain('Mocked Street 123');
    });
});