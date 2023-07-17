/*

new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array),
 copies values from it into the set.
set.add(value) – adds a value, returns the set itself.
set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.

*/

let teams = ["Barca", "Real", "Miami", "Barca"];

let unique_teams = new Set(teams);

console.log("This is the set : ");
for (let team of unique_teams) {
  console.log(team);    
}

console.log("This is the array : ");
for (let team of teams) {
  console.log(team);
}

console.log(unique_teams.has("Barca"));
