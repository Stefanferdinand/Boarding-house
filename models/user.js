const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  ownedHouse: Array,
  orderedHouse: [
    {
      id: String,
      months: Number,
      date: Date,
    },
  ],
});

const user = mongoose.model("user", userSchema);

module.exports = user;
