// Let's see an example of asynchronous code:

// Declare and initialize variables
let greet_one = "Hello";
let greet_two = "World!!!";

// Log the value of greet_one
console.log(greet_one);

// Set a timeout of 1000 milliseconds (1 second)
setTimeout(function () {
  // This code will be executed asynchronously after the delay
  console.log("Asynchronous");
}, 1000);

// Log the value of greet_two
console.log(greet_two);

// Set another timeout of 2000 milliseconds (2 seconds)
setTimeout(function () {
  // This code will also be executed asynchronously after the delay
  console.log("Vreew");
}, 2000);


/*
In the above example, if you run the code on your machine you will see 
greet_one and greet_two logged even there is code in between those 2 logs.

Now, setTimeout is asynchronous so it runs in background, allowing code 
after it to execute while it runs. After 10 seconds, Asynchronous will 
print because we set a time of 10 seconds in setTimeout to execute it after 10 seconds.
*/
