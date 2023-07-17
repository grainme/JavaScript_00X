const n = 10;
try {
  n += 1;
  console.log(n);
} catch (error) {
  console.log("Ooo you can't modify CONSTANTS!");
}
