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
