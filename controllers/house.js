const house = require("../models/house.js");
const user = require("../models/user.js");

const handleErrorOrder = (res) => {
  return res.json({
    status: false,
    msg: "Can't Order, you already ordered this house or you are the owner of this house",
  });
};

const getHouseDetails = async (req, res) => {
  try {
    const data = req.params.id;
    const selectedHouse = await house.findById(data).limit(1);
    const owner = await user.find({ ownedHouse: selectedHouse._id }).limit(1);

    const email = owner.email;
    const name = owner.name;

    res.json({ house: selectedHouse, owner: {email: email, name: name} });
  } catch (error) {
    res.json(error);
  }
};

const postOrder = async (req, res) => {
  try {
    const data = req.body;

    const userRef = await user.find({ email: data.userEmail }).limit(1);

    const check = await user.find({
      // check kalo dia udh order house ini
      $and: [
        { email: data.userEmail },
        { orderedHouse: { $elemMatch: { id: data.id } } },
      ],
    });

    if (check.length > 0) return handleErrorOrder(res);

    let id = userRef[0]._id; // user id

    const isOwner = await house.find({
      // apakah dia order house punya dia sendiri?
      $and: [{ owner: id }, { _id: data.id }],
    });

    if (isOwner.length > 0) return handleErrorOrder(res);

    const inserted = {
      id: data.id,
      months: data.months,
      date: new Date(),
    };

    const update = await user.updateOne(
      { _id: id },
      { $push: { orderedHouse: inserted } }
    );

    res.json({ status: true });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getHouseDetails, postOrder };
