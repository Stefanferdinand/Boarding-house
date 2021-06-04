const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");
const browseRoute = require("./routes/browse.js");
const houseRoute = require("./routes/house.js");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/browse", browseRoute);
app.use("/api/house", houseRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const CONNECTION_URL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.5l5m8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
