// axios is library used to handle Api requests
const axios = require("axios");

const getData = async () => {
  try {
    const data = await axios.get("http://cat-fact.herokuapp.com/facts");
    console.log(data);
  } catch (err) {
    console.log("ohh something is wrong!!");
  }
};

getData();
