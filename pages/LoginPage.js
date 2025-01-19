class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = '#UserName';
        this.passwordInput = '#Password';
        this.loginButton = 'button[type="submit"]';
        this.accountIcon = '[data-test-id="account-menu"]'; // Update this selector based on actual website
    }

    async navigateToLogin() {
        await this.page.goto('https://login.funda.nl/');
        await this.handleCookieConsent();
    }

    async handleCookieConsent() {
        // Wait for cookie consent dialog to be visible
        await this.page.waitForSelector('.didomi-popup-notice', { state: 'visible' });
        
        // Click "Alles accepteren" (Accept all) button using the specific ID
        await this.page.waitForSelector('#didomi-notice-agree-button');
        await this.page.click('#didomi-notice-agree-button');
        
        // Wait for the cookie dialog to disappear
        await this.page.waitForSelector('.didomi-popup-notice', { state: 'hidden', timeout: 10000 });
    }

    async login(email, password) {
        // Wait for email input to be visible and enabled
        await this.page.waitForSelector(this.emailInput, { state: 'visible' });
        await this.page.waitForFunction((selector) => {
            const element = document.querySelector(selector);
            return element && !element.disabled;
        }, this.emailInput);
        
        // Fill in email
        await this.page.fill(this.emailInput, email);
        
        // Wait for password input and fill
        await this.page.waitForSelector(this.passwordInput, { state: 'visible' });
        await this.page.fill(this.passwordInput, password);
        
        // Click login button
        await this.page.waitForSelector(this.loginButton, { state: 'visible' });
        await this.page.click(this.loginButton);
    }

    async isLoggedIn() {
        try {
            // Wait for navigation after login
            await this.page.waitForNavigation();
            
            // After login, we should be redirected to funda.nl or a dashboard page
            // Let's wait for either:
            // 1. Account related element
            // 2. URL change to indicate successful login
            // 3. Any specific element that appears after successful login
            
            return await Promise.race([
                // Check if we're on the main funda.nl page after login
                this.page.waitForURL('https://www.funda.nl/', { waitUntil: 'networkidle', timeout: 10000 })
                    .then(() => true)
                    .catch(() => false),
                
                // Check for any account-specific element (update selector as needed)
                this.page.waitForSelector('//span[contains(text(), "Mijn Huis")]', { timeout: 10000 })
                    .then(() => true)
                    .catch(() => false)
            ]);
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    }
}

module.exports = LoginPage;