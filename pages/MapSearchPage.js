class MapSearchPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            mapButton: '//a[contains(text(), " Zoek op kaart")]',
            searchBox: '[data-testid="searchBoxSuggestions-mobile"]',
            searchInput: '[id="SearchBox-input"]',
            searchResults: '[data-test-id="search-box-list-item"]',
            searchSuggestions: '//ul[contains(@class,"suggestion-list")]'
        };
    }

    async navigateToMap() {
        // Navigate to the main page
        await this.page.goto('https://www.funda.nl/');
        
        // Wait for and click the map search button
        await this.page.locator(this.selectors.mapButton).click();

        // Wait for the navigation to complete
        await this.page.waitForURL('**/kaart/**');
    }

    async navigateToCoordinates(latitude, longitude, zoom = 10) {
        // First navigate to main page and click map button
        await this.navigateToMap();
        
        // Then navigate to specific coordinates
        const url = `https://www.funda.nl/zoeken/kaart/koop?selected_area=["nl"]&zoom=${zoom}&centerLat=${latitude}&centerLng=${longitude}`;
        await this.page.goto(url);
        
        // Wait for map to load
        await this.page.waitForTimeout(2000);
    }

    async searchByLocation(location) {
        // First navigate to map view
        await this.navigateToMap();
        
        // Click the search box to activate it
        await this.page.click(this.selectors.searchBox);
        
        // Wait for the input field to be visible and fill it
        await this.page.waitForSelector(this.selectors.searchInput);
        await this.page.fill(this.selectors.searchInput, location);
        
        // Wait for suggestions and click the first matching one
        await this.page.waitForSelector(this.selectors.searchSuggestions);
        await this.page.click(`${this.selectors.searchSuggestions} >> text="${location}"`);
        
        // Wait for results to load
       // await this.waitForSearchResults(); - unable to find the elements on the map  
       }

    async searchByPostcode(postcode) {
        // First navigate to map view
        await this.navigateToMap();
        
        // Click the search box to activate it
        await this.page.click(this.selectors.searchBox);
        
        // Wait for the input field to be visible and fill it
        await this.page.waitForSelector(this.selectors.searchInput);
        await this.page.fill(this.selectors.searchInput, postcode);
        
        // Press Enter to search
        await this.page.keyboard.press('Enter');
        
        // Wait for results to load
        // await this.waitForSearchResults();  - unable to find the elements on the map 
    }

    async waitForSearchResults() {
        try {
            await this.page.waitForSelector(this.selectors.searchResults, {
                state: 'visible',
                timeout: 10000
            });
        } catch (error) {
            console.error('Search results not found:', error);
            throw new Error('Search results did not appear after search');
        }
    }

    async getCurrentUrl() {
        return await this.page.url();
    }
}

module.exports = MapSearchPage;