const mongoose = require("mongoose");

const houseSchema = mongoose.Schema({
  name: String,
  owner: String,
  pricePerMonth: Number,
  address: String,
  description: String,
  image: String,
});

const house = mongoose.model("house", houseSchema);

module.exports = house;
