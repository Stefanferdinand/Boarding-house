const house = require("../models/house.js");
const user = require("../models/user.js");

const handleErrorInsertHouse = (res) => {
  return res.json({
    msg: "Invalid Data or you already advertise this house, please choose a different house name",
    status: false,
  });
};

const getUserInfo = async (req, res) => {
  try {
    let email = req.params.email;
    const info = await user.find({ email: email });

    if (info[0].ownedHouse.length == 0 && info[0].orderedHouse.length == 0) {
      res.json({ status: false });
    } else {
      res.json({ status: true });
    }
  } catch (error) {
    res.json(error);
  }
};

const getAccount = async (req, res) => {
  try {
    const email = req.params.email;
    const ownerId = await user.find({ email: email });
    const ownedHouses = await house.find({ owner: ownerId[0]._id });

    const arrOrdered = ownerId[0].orderedHouse.map((el) => {
      return el.id;
    });

    const orderedHouses = await house.find({ _id: arrOrdered });

    res.json({
      status: true,
      ownedHouse: ownedHouses,
      orderedHouse: orderedHouses,
      arrOrdered: ownerId[0].orderedHouse,
    });
  } catch (error) {
    res.json(error);
  }
};

const postHouse = async (req, res) => {
  try {
    const data = req.body;

    const ownerId = await user.findOne({ email: data.owner });
    data.owner = ownerId._id;

    if (
      data.pricePerMonth != "" &&
      data.description != "" &&
      data.image != ""
    ) {
      const newHouse = new house(data);
      try {
        await newHouse.save().then(async (doc) => {
          await user.updateOne(
            { _id: ownerId._id },
            { $push: { ownedHouse: doc._id } }
          );
        });

        res.json({ status: true });
      } catch (error) {
        res.json({ status: false });
      }
    } else {
      return handleErrorInsertHouse(res);
    }
  } catch (error) {
    return handleErrorInsertHouse(res);
  }
};

const deleteOwnedHouse = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await house.findByIdAndDelete(id);

    res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getAccount, postHouse, deleteOwnedHouse, getUserInfo };
