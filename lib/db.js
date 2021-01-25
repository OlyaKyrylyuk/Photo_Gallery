const mongoose = require("mongoose");
const connection = "mongodb://localhost/PhotosView";

const db = mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connect");
});

module.exports = db;
