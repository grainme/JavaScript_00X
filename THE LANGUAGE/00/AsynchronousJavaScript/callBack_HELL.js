// This is known as the CALLBACK HELL LOL /°-°\
setTimeout(() => {
  console.log(100);
  setTimeout(() => {
    console.log(101);
    setTimeout(() => {
      console.log(102);
      setTimeout(() => {
        console.log(103);
        setTimeout(() => {
          console.log(104);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
