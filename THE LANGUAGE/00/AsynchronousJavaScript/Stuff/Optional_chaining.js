// let's fetch data from an imaginary api

const axios = require("axios");

const fetchData = async () => {
  const data = await axios.get("imaginaryApi.com");
  // person? we'll access name if and only if person field exists ..
  const name = data.person?.name;
};
