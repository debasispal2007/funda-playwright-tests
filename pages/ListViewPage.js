class ListViewPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            // Filter selectors
            filterButton: '[data-test-id="filters-button"]',
            priceMinInput: '[data-testid="FilterRangepriceMin"] input',
            priceMaxInput: '[data-testid="FilterRangepriceMax"] input',
            livingAreaMinInput: '[data-testid="FilterRangefloor_areaMin"] input',
            livingAreaMaxInput: '[data-testid="FilterRangefloor_areaMax"] input',
            keywordInput: '[data-test-id="keyword-filter-input"]',
            applyFiltersButton: '[data-test-id="apply-filters-button"]',
            
            // Results and view selectors
            listViewButton: '[data-test-id="list-view-button"]',
            searchResults: '//h1[@data-testid="pageHeader"]//div[contains(text(),"in Nederland")]',
        };
    }

    async navigateToListView() {
        await this.page.goto('https://www.funda.nl/koop/');
        // Wait for the page to load
        await this.page.waitForSelector(this.selectors.searchResults, { state: 'visible' });
    }

    // async openFilters() {
    //     await this.page.click(this.selectors.filterButton);
    //     // Wait for filter panel to be visible
    //     await this.page.waitForLoadState('networkidle');
    // }

    async setPriceFilter(min, max) {
        await this.page.fill(this.selectors.priceMinInput, min.toString());
        await this.page.fill(this.selectors.priceMaxInput, max.toString());
    }

    async setLivingAreaFilter(min, max) {
        await this.page.fill(this.selectors.livingAreaMinInput, min.toString());
        await this.page.fill(this.selectors.livingAreaMaxInput, max.toString());
    }

    async setKeywordFilter(keyword) {
        const checkboxSelectors = {
            'tuin': {
                checkbox: '#checkbox-garden',
                label: '//label[contains(text(), "Tuin")]'
            },
            'balkon': {
                checkbox: '#checkbox-balcony',
                label: '//label[contains(text(), "Balkon")]'
            },
            'garage': {
                checkbox: '#checkbox-lock_up',
                label: '//label[contains(text(), "Garagebox")]'
            }
        };
    
        // Get the correct selectors for the given keyword
        const selectors = checkboxSelectors[keyword.toLowerCase()];
        if (!selectors) {
            throw new Error(`Unsupported keyword filter: ${keyword}. Supported keywords are: tuin, balkon, garage`);
        }
    
        // Scroll through the page until we find the element
        await this.page.evaluate(async (labelXPath) => {
            const element = document.evaluate(
                labelXPath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
    
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, selectors.label);
    
        // Wait for the element to be visible after scrolling
        await this.page.waitForSelector(selectors.checkbox, { state: 'visible' });
        
        // Click the checkbox
        await this.page.click(selectors.checkbox);
        
        // Wait a moment for any UI updates
        await this.page.waitForTimeout(500);
    }

    // async switchToListView() {
    //     await this.page.click(this.selectors.listViewButton);
    //     // Wait for view to update
    //     await this.page.waitForLoadState('networkidle');
    // }

    async getSearchResults() {
        // Wait for the main listings container
        await this.page.waitForSelector('div.flex.flex-col.gap-3.mt-4');
        
        // Get number of listings by counting elements with border-b class (individual listing cards)
        const listingsCount = await this.page.$$eval('div.flex.flex-col.gap-3.mt-4 > div > div.border-b.pb-3', 
            listings => listings.length
        );
        
        console.log(`Found ${listingsCount} listings`);
        return listingsCount;
    }
    async verifyFilteredResults() {
        // Get current URL to verify filters are applied
        const currentUrl = await this.page.url();
        return currentUrl;
    }
}

module.exports = ListViewPage;