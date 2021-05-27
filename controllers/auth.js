const user = require("../models/user.js");

const handleErrorSignin = (res) => {
  return res.json({ msg: "* Invalid email or password", status: false });
};

const handleErrorSignup = (res) => {
  return res.json({ msg: "* Email must be unique", status: false });
};

const postSignin = async (req, res) => {
  try {
    const data = req.body;
    const check = await user.find({ email: data.email }).limit(1);

    if ((check.length == 0 && data.email != "") || data.password === "") {
      return handleErrorSignin(res);
    } else if (check[0].password === data.password) {
      return res.json({ name: check[0].name, email: check[0].email });
    }
  } catch (error) {
    return handleErrorSignin(res);
  }
};

const postSignup = async (req, res) => {
  const data = req.body;
  const check = await user.find({ email: data.email }).limit(1);

  data["ownedHouse"] = [];
  data["orderedHouse"] = [];

  if (
    check.length == 0 &&
    data.name != "" &&
    data.email != "" &&
    data.password != ""
  ) {
    const newUser = new user(data); // creating new user

    try {
      await newUser.save();
      res.json({ status: true });
    } catch (error) {
      res.json({ status: false });
    }
  } else {
    return handleErrorSignup(res);
  }
};

module.exports = { postSignin, postSignup };
