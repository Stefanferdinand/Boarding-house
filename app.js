const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const browseRoute = require("./routes/browse.js");
const houseRoute = require("./routes/house.js");
const path = require("path");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/browse", browseRoute);
app.use("/house", houseRoute);

const CONNECTION_URL =
  "mongodb+srv://admin:admin@cluster0.5l5m8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
