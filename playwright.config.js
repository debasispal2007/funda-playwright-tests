const config = {
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1920, height: 1080 },
        video: 'on-first-retry',
        screenshot: 'only-on-failure'
    },
    reporter: [
        ['html'],
        ['list']
    ]
};

module.exports = config;