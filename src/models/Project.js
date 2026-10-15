const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000, default: "" },
  status: {
    type: String,
    enum: ["planned", "in-progress", "completed", "paused"],
    default: "planned"
  },
  githubUrl: { type: String, trim: true, default: "" },
  liveUrl: { type: String, trim: true, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
