function add(x, y) {
  return x + y;
}

function divid(x, y) {
  return x / y;
}

function compute(callBack, x, y) {
  return callBack(x, y);
}

console.log(compute(add, 2, 16));
    