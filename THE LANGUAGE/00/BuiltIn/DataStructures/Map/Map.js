/*

Methods and properties are:

new Map() – creates the map.
map.set(key, value) – stores the value by the key.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the element (the key/value pair) by the key.
map.clear() – removes everything from the map.
map.size – returns the current element count.


*/

person = {
  name: "Marouane",
  age: 22,
  isMoroccan: true,
};

let teams = new Map(Object.entries(person));

for (let key_x of teams.keys()) {
  console.log(key_x + " : " + teams.get(key_x));
}

// console.log(teams.get("name"));
