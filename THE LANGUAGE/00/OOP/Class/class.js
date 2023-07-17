class Person {
  constructor(name, age, fieldOfStudy) {
    this.name = name;
    this.age = age;
    this.fieldOfStudy = fieldOfStudy;
  }

  sayHi = function () {
    console.log("I'm, " + this.name + "!");
  };

  whatDo = function () {
    console.log("I master, " + this.fieldOfStudy + "!");
  };
}

let Leo = new Person("Leo", 35, "Football");

Leo.sayHi();
Leo.whatDo();
