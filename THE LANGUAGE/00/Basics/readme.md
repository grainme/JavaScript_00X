## 📝 Notes
- The benefit of a separate file is that the browser will download it and store it in its cache. 🌐💾
- Other pages that reference the same script will take it from the cache instead of downloading it, so the file is actually downloaded only once. 🔄⏬
- That reduces traffic and makes pages faster. ⚡

Web Cache or HTTP cache is a system for optimizing the World Wide Web. 🕸️🚀

# 🔒 "use strict"
The "use strict" directive was new in ECMAScript version 5.
It helps you write cleaner and 'secure' JavaScript code. ✨🔒
Strict mode changes previously accepted "bad syntax" into real errors.
Example:
In normal JS code, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable. 🚫🌍

<code>
"use strict";
x = 3.14;       // This will cause an error because x is not declared
</code>

# 📦 Variables
We can declare variables to store data by using the var, let, or const keywords.
- `let` is a modern way declaration.
- `var` is an old-school variable declaration.
- `const` - The value of the variable cannot be changed. 📝🔒

Programming languages that allow vars to take different data types values are known as Dynamically typed (e.g., Php, Python, JS).
The JS code will never ever stop, even if we get a logical error like "hello"/2. It will give us NaN value (which indicates a computational error), and we have Infinity (like 2/0). 💻🔢

# 💬 String 
```js
let name = "Marouane";
console.log("Hello, ${name}"); // is this PHP ??! NO :)

let test;
alert(test); // shows "undefined"

alert(typeof(name)); // string
```

# Prompt
The visitor can type something in the prompt input field and press OK. Then we get that text in the result. Or they can cancel the input by pressing Cancel or hitting the Esc key, then we get null as the result.
````js
let age = prompt('How old are you?', 100);`// 100 is the default value
let isBoss = confirm("Are you the Boss");
alert(isBoss) // Boolean Value
alert(`You are ${age} years old!`); // You are 100 years old!
````

# Loops
It's the same as C syntax, only difference is that we don't specify here the type of the "iterator" :
eg : for(let i = 0; i < 4; i++);

# Function
function name(parameter1, parameter2, ... parameterN) {
 // body
}
````js
function sayHi() {
  alert( "Hello" );
}

// Same as the following

let sayHi = function() {
  alert( "Hello" );
};

````

There is a subtle difference:
This Works:
````js
sayHi("John"); // Hello, John

function sayHi(name) {
  alert( `Hello, ${name}` );
}
`````
This does not work:
````js
sayHi("John"); // error!

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
````

<h3>Arrays</h3>
```js
var names = ["Marouane", "Hamza", "Younes"];

for (let i = 0; i < 3; i++) {
console.log(names[i]);
}

console.log("--------\n");

names.forEach((x) => {
console.log(x);
});

```

