const fs = require('fs');

function generateRandomProductName() {
    const adjectives = ["Modern", "Classic", "Stylish", "Elegant", "Vintage", "Compact", "Luxury", "Affordable", "Premium", "Eco"];
    const items = ["Chair", "Table", "Sofa", "Lamp", "Desk", "Shelf", "Cabinet", "Cupboard", "Stool", "Bench"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const item = items[Math.floor(Math.random() * items.length)];
    return `${adjective} ${item}`;
}

function generateRandomPrice() {
    const price = (Math.random() * 900 + 100).toFixed(2); // Generates a price between 100.00 and 999.99
    return `${price}€`;
}

function generateRandomDescription() {
    const phrases = [
        "This product is perfect for any modern home.",
        "Crafted with high-quality materials and attention to detail.",
        "An excellent addition to your living room or office.",
        "Designed to offer both style and comfort.",
        "Durable and affordable, ideal for daily use.",
        "Enhance your space with this elegant piece.",
        "A blend of luxury and functionality.",
        "Compact yet spacious, suitable for any room.",
        "Premium quality at an affordable price.",
        "Eco-friendly materials and a timeless design."
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function generateProductList(count) {
    const products = [];
    for (let i = 1; i <= count; i++) {
        products.push({
            id: i,
            title: generateRandomProductName(),
            price: generateRandomPrice(),
            thumbnail: `https://dummyimage.com/200x200/000/fff&text=Product+${i}`, // Placeholder image URL
            description: generateRandomDescription()
        });
    }
    return products;
}

// Generate 500 products
const productList = generateProductList(500);

// Save the JSON to a file
fs.writeFileSync('products.json', JSON.stringify({ products: productList }, null, 2), 'utf-8');

console.log("JSON file with 500 products has been generated as 'products.json'");
