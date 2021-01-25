const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  img: {
    data: Buffer,
    contentType: String,
  },

  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Photo", photoSchema);
