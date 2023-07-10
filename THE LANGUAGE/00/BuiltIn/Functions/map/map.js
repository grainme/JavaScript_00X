function display(x) {
  x.forEach((x) => {
    console.log(x);
  });
}

function toUpper(x) {
  return x.toUpperCase();
}

function digitize(x) {
  let res = 0;
  x.split("").forEach((x) => {
    res *= 10;
    res += x - "0";
  });
  return res;
}

// Main Program

let names = ["Marouane", "Hamza"];

names = names.map(toUpper);

display(names);
