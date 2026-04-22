//2. ARROW FUNCTIONS VS METHODS IN OBJECTS
const person = {
    name:"Raha",
    age: 25,

    sayHiArrow: () => {
        console.log(`Arrrow says: Hi, I'm ${this.name}`);
    },

    sayHiRegular() {
        console.log(`Regular says: Hi, I'm ${this.name}`);
    }
};

person.sayHiArrow();
person.sayHiRegular();