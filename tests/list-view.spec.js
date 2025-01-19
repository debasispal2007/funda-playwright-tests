const { test, expect } = require('@playwright/test');
const ListViewPage = require('../pages/ListViewPage');
const filterData = require('../utils/filter-data');

test.describe('List View Filter Tests', () => {
    let listViewPage;

    test.beforeEach(async ({ browser }) => {
        // Reuse authentication from login test
        const context = await browser.newContext({
            storageState: './state.json'
        });
        
        const page = await context.newPage();
        listViewPage = new ListViewPage(page);
    });

    test('should filter properties using price, living area and keyword', async () => {
        // Navigate to list view
        await listViewPage.navigateToListView();
        
        // Apply filters
        await listViewPage.setPriceFilter(
            filterData.filters.price.min,
            filterData.filters.price.max
        );
        
        await listViewPage.setLivingAreaFilter(
            filterData.filters.livingArea.min,
            filterData.filters.livingArea.max
        );
        
        // Add keyword filter
        await listViewPage.setKeywordFilter(filterData.filters.keywords[0]);
        
        // Verify filters are applied
        const filteredUrl = await listViewPage.verifyFilteredResults();

        // For debugging
        console.log('Filtered URL:', filteredUrl);
        
        // Create the expected encoded values
        const expectedPrice = `price=%22${filterData.filters.price.min}-${filterData.filters.price.max}%22`;
        const expectedFloorArea = `floor_area=%22${filterData.filters.livingArea.min}-${filterData.filters.livingArea.max}%22`;
        const expectedExteriorSpace = 'exterior_space_type=[%22garden%22]';
        const expectedArea = 'selected_area=[%22nl%22]';
        
        // Verify each encoded parameter
        expect(filteredUrl).toContain(expectedPrice);
        expect(filteredUrl).toContain(expectedFloorArea);
        expect(filteredUrl).toContain(expectedExteriorSpace);
        expect(filteredUrl).toContain(expectedArea);
        
        // Verify we have search results
        const resultsCount = await listViewPage.getSearchResults();
        expect(resultsCount).toBeGreaterThan(0);
    });
});