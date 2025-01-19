// tests/map-search.spec.js
const { test, expect } = require('@playwright/test');
const MapSearchPage = require('../pages/MapSearchPage');
const searchData = require('../utils/map-search-data');

test.describe('Map Search Tests', () => {
    let mapSearchPage;

    test.beforeEach(async ({ browser }) => {
        // Reuse the authentication from login.spec.js
        const context = await browser.newContext({
            storageState: './state.json'  // This was saved by login.spec.js
        });
        
        const page = await context.newPage();
        mapSearchPage = new MapSearchPage(page);
    });

    test('should navigate to specific coordinates on map', async () => {
        const { latitude, longitude, zoom } = searchData.coordinates;
        await mapSearchPage.navigateToCoordinates(latitude, longitude, zoom);
        
        const currentUrl = await mapSearchPage.getCurrentUrl();
        expect(currentUrl).toContain(`centerLat=${latitude}`);
        expect(currentUrl).toContain(`centerLng=${longitude}`);
        expect(currentUrl).toContain(`zoom=${zoom}`);
    });

    test('should search by location', async () => {
        await mapSearchPage.navigateToMap();
        const location = searchData.locations[0];
        await mapSearchPage.searchByLocation(location.name);
        
        const currentUrl = await mapSearchPage.getCurrentUrl();
        expect(currentUrl).toContain('kaart');
        expect(currentUrl).toContain('koop');
    });

    test('should search by postcode', async () => {
        await mapSearchPage.navigateToMap();
        const postcode = searchData.postcodes[0];
        await mapSearchPage.searchByPostcode(postcode.code);
        
        const currentUrl = await mapSearchPage.getCurrentUrl();
        expect(currentUrl).toContain('kaart');
        expect(currentUrl).toContain('koop');
    });
});