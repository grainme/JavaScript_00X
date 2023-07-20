// import axios from 'axios'

const axios = require("axios");

const data = axios.get("http://cat-fact.herokuapp.com/facts");

// console.log(data); // this is gonna giving a pending promise

// so we need to deal with the promise

data
  .then((res) => {
    let arr = res.data;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].text);
    }
  })
  .catch((err) => {
    console.log(err);
  });
