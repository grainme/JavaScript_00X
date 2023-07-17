// In JavaScript, the this keyword is a little different compared to other languages.
// It refers to an object, but it depends on how or where it is being invoked.
// It also has some differences between strict mode and non-strict mode.

// In an object method, this refers to the object
// Alone, this refers to the global object
// In a function, this refers to the global object
// In a function, in strict mode, this is undefined
// In an event, this refers to the element that received the event
// Methods like call(), apply(), and bind() can refer this to any object

let person = {
  nom: "Marouane",
  age: 21,
  sayHi: function () {
    console.log("Hello, " + this.nom + " !");
  },
};

person.sayHi();

class Person {
  constructor(name, age, fieldOfStudy) {
    this.name = name;
    this.age = age;
    this.fieldOfStudy = fieldOfStudy;
  }

  sayHi = function () {
    console.log("Hello, " + this.name + " !");
  };
}

let Leo = new Person("Leo", 35, "Football");

Leo.sayHi();
