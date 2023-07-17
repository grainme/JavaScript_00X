let test = {
  a: 1,
  b: 2,
  c: 3,
};

// This is not as good as of!
for (const property in test) {
  console.log(`${property}: ${test[property]}`);
}

// Let's test the of loop
for (const it of Object.keys(test)) {
  console.log(it + " : " + test[it]);
}

// you need to call out the object.keys method :)
