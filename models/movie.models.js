const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    release_date: { type: Date, required: true },
    runtime: { type: String, required: true },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    cast: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
