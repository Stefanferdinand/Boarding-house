const house = require("../models/house.js");

const getBrowse = async (req, res) => {
  try {
    const arrayOfHouse = await house.find();
    res.json(arrayOfHouse);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getBrowse };
