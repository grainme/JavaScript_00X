const person = {
  fullName: function (city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  },
};

const person1 = {
  firstName: "John",
  lastName: "Doe",
};

const person2 = {
  firstName: "Micho",
  lastName: "Nikov",
  sayHi: function () {
    console.log("Hello, " + this.firstName);
  },
};

// fullName function is defined in the person object we can borrow it
// person1 to use it, and this can be done using call function
// Object_Name.function_Name.call(object_Name, args if needed for the function)
console.log(person.fullName.call(person1, "Oslo", "Norway"));

// instead of call function we can also use apply function
// Apply takes an array of args instead of args seperated by comma

// There is a function called sayHi that person has access to but
// person want also to say hi to the world but so he needs access to
// the same function, How to do that without redefining the whole function
// to person1. JS got you, bind function do just that, it allows you to
// borrow function from other object

const sayHi = person2.sayHi.bind(person1);

// Now we can call the sayHi function on person1
sayHi();
