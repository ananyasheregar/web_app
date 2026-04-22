function Product(name, price) {
    this.name = name;
    this.price = price;
}
Product.prototype.getDetails = function() {
    return `${this.name} - $${this.price}`;
};

const ShoppingCart = (function() {
    let items = [];

    return {
        addItem: (product) => {
            items.push(product);
            console.log(`Added: ${product.name}`);
        },

        getTotal: () => items.reduce((sum,item) => sum + item.price, 0),
        getInventory: () => [...items]
    };
})();

const calculateShipping = async(zipCode) => {
    console.log("Calculating shipping costs...");
    return new Promise((resolve) => {
        setTimeout(() => resolve(zipCode == "90210" ? 0 : 15), 1500)
    });
};

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

async function runStoreExample() {
    const laptop = new Product("MacBook", 1200);
    const mouse = new Product("Magic Mouse", 80);

    ShoppingCart.addItem(laptop);
    ShoppingCart.addItem(mouse);

    console.log("Subtotal:", ShoppingCart.getTotal());

    const shippingFee = await calculateShipping("12345");
    console.log(`Final Total (inc. shipping): $${ShoppingCart.getTotal() + shippingFee}`);

    const updateLayout = debounce(() => console.log("UI Layout Refreshed!"), 250);
    window.addEventListener('resize', updateLayout);
    console.log("Event Listener active: Resize your window to see Debouncing in action.");
}

runStoreExample();