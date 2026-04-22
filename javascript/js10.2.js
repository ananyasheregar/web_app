function Product(name, price) {
    this.name = name;
    this.price = price;

}

Product.prototype.getDetails = function() {
    return `${this.name} -$${this.price}`;
};

const mobile = new Product("mobile",100);
const phone = new Product("Phone", 50000);

console.log(mobile.getDetails());
console.log(phone.getDetails());