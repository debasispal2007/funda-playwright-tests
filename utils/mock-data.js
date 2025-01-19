// utils/mock-data.js
module.exports = {
    listingResponse: {
        id: "mock-listing-123",
        address: {
            street: "Mocked Street",
            number: "123",
            postalCode: "1234 AB",
            city: "Amsterdam"
        },
        price: {
            amount: 450000,
            currency: "EUR",
            label: "€ 450.000 k.k."
        },
        features: {
            livingArea: 120,
            plotSize: 250,
            rooms: 4,
            bedrooms: 3,
            energyLabel: "A+++"
        },
        description: "Luxurious mock property in a prime location",
        images: [
            { url: "https://example.com/mock-image-1.jpg", alt: "Front view" },
            { url: "https://example.com/mock-image-2.jpg", alt: "Living room" }
        ]
    }
};