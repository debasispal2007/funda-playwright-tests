class NetworkMockPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            listingCard: '[data-testid="listingDetailsAddress"]',
            propertyInfo: '[data-testid="pageHeader"]'
        };
    }

    async setupNetworkInterception() {
        // Intercept all network requests to the listing details
        await this.page.route('**/*', async route => {
            const url = route.request().url();
            
            // If it's a listing details URL, return mock data
            if (url.includes('/koop/') || url.includes('/detail/')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: `
                        <h1 class="object-header__container" data-global-id="mock-id">
                            <span class="block text-2xl font-bold">Mocked Street 123</span>
                            <span class="text-neutral-40">1234 AB Amsterdam</span>
                        </h1>
                    `
                });
            } else {
                // For other requests, continue normally
                await route.continue();
            }
        });
    }
    
    async getListingDetails() {
        // Wait for the mocked content to be present
        await this.page.waitForSelector('h1.object-header__container');
        
        // Get the mocked address details
        const address = await this.page.$eval('h1.object-header__container > span:first-child', 
            el => el.textContent.trim()
        );
        
        return address;
    }

    async navigateToListing() {
        await this.page.goto('https://www.funda.nl/koop/');
        
        // // Wait for listings to be loaded
        // await this.page.waitForSelector('div.flex.flex-col.gap-3.mt-4');
        
        // // Get the first listing's href
        // const firstListingHref = await this.page.$eval('[data-testid="listingDetailsAddress"]', 
        //     anchor => anchor.href
        // );
        
        // // Navigate directly to the listing detail page
        // await this.page.goto(firstListingHref);
    }

    // async getListingDetails() {
    //     // Wait for the main property header container
    //     await this.page.waitForSelector('h1.object-header__container');
        
    //     // Get the property details (address and city)
    //     const address = await this.page.$eval('h1.object-header__container > span:first-child', 
    //         el => el.textContent.trim()
    //     );
        
    //     const city = await this.page.$eval('h1.object-header__container > span.text-neutral-40', 
    //         el => el.textContent.trim()
    //     );
        
    //     return `${address} ${city}`;
    // }
}

module.exports = NetworkMockPage;