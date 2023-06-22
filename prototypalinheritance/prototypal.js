Function.prototype.inherits = function(SuperClass) {
    function Surrogate() {}
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}
 
function Animal(name) {
    this.name = name;
}

Animal.prototype.move = function() {
    console.log(`${this.name} moves!`);
}


function Cat(name) {
    this.name = name;
}

Cat.inherits(Animal); 

//must go before other methods are defined, will remove all methods before

Cat.prototype.meow = function() {
    console.log(`${this.name} meows!`);
}


function Dog(name) {
    this.name = name;
}

Dog.inherits(Animal);

Dog.prototype.bark = function() {
    console.log(`${this.name} barks!`);
}


