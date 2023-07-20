const ev = new Promise((resolve, reject) => {
  let name = "MESSI";
  if (name === "Marouane") {
    resolve(name);
  } else {
    reject("Ooops, Name was not Marounae!!!");
  }
});

ev.then((my_name) => {
  console.log(my_name);
}).catch((err) => {
  console.log(err);
});
