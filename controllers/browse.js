const house = require("../models/house.js");

const getBrowse = async (req, res) => {
  try {
    const arrayOfHouse = await house.find();
    if(req.accepts('application/json')) res.json(arrayOfHouse);
    else{
      res.json({error: 'error'});
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getBrowse };
