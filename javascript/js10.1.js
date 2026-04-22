memory
function Product(name, price) {
    this.name = name;
    this.price = price;


    this.getDetails = function() {
        return `${this.name} -$${this.price}`;
    };
}

const apple = new Product("mobile",2);
const phone = new Product("Phone", 500);

console.log(apple.getDetails());
console.log(phone.getDetails());



